from flask import request, jsonify
from .. import app
from .. import mydb

@app.route('/search-by-category', methods=['GET', 'POST'])
def search_by_category():
    cursor = mydb.cursor()
    try:
        if request.method == 'POST':
            category = request.json.get('category')

            if not category:
                return jsonify({'message': 'Please provide a category'})
        
            query = "SELECT * FROM products WHERE category = %s"
            cursor.execute(query, (category,))

            results = cursor.fetchall()

            data = [{'id': row[0], 
                    'name': row[1], 
                    'price': row[2], 
                    'rating': row[3],
                    'url': row[4],
                    'image_url': row[5], 
                    'shop': row[6]} for row in results]

            return jsonify(data)
        else:
                return jsonify({'message': 'Unsupported request method'})
    except Exception as e:
        return jsonify({'error': str(e)})
    finally:
        cursor.close()