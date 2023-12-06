from flask import request, jsonify
from .. import app
from .. import mydb
from txtai.embeddings import Embeddings
from fuzzywuzzy import fuzz

@app.route("/")
def index():
    return "Nothing to search!"

@app.route('/search', methods=['GET', 'POST'])
def search():
    cursor = mydb.cursor()
    try:
        if request.method == 'POST':
            searchTerm = request.json.get('searchTerm')

            if not searchTerm:
                return jsonify({'message': 'Please provide a searchTerm'})
        
            embeddings = Embeddings()
            embeddings.load("models/products")

            res = embeddings.search(searchTerm, 500)

            id_list = [r[0] for r in res]

            # AI SEARCH
            placeholders = ', '.join(['%s'] * len(id_list))
            query = f"SELECT * FROM products WHERE id IN ({placeholders})"
            cursor.execute(query, id_list)

            # REGEX SEARCH 
            # cursor.execute("SELECT * FROM products WHERE name LIKE %s LIMIT 100", ('%' + searchTerm + '%',))

            results = cursor.fetchall()

            data = [{'id': row[0], 
                    'name': row[1], 
                    'price': row[2], 
                    'rating': row[3],
                    'url': row[4],
                    'image_url': row[5], 
                    'shop': row[6]} for row in results]

            # final_results = [
            #     fuzz.partial_ratio(searchTerm.lower(), item['name'].lower()) / 100 + res[i][1] 
            #     for i, item in enumerate(data)
            # ]

            # # Sort data based on final_results
            # sorted_data = [item for _, item in sorted(zip(final_results, data), key=lambda x: x[0], reverse=True)]
            scores = [
                fuzz.partial_ratio(searchTerm.lower(), item['name'].lower()) / 100 + res[i][1] 
                if item['name'].lower().startswith(searchTerm.lower()[:1])
                else 0  # Set a lower score for items that don't start with the query
                for i, item in enumerate(data)
            ]

            # Sort data based on scores, with higher scores coming first
            sorted_data = [item for _, item in sorted(zip(scores, data), key=lambda x: x[0], reverse=True)]
            return jsonify(sorted_data)
        else:
                return jsonify({'message': 'Unsupported request method'})
    except Exception as e:
        return jsonify({'error': str(e)})
    finally:
        cursor.close()