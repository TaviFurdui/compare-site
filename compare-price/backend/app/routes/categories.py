from flask import request, jsonify
from .. import app
from .. import mydb

def process_string(input_string):
    processed_string = input_string.replace('-', ' ').replace('_', ' ')
    processed_string = processed_string.title()
    
    return processed_string

def process_subcategories(data):
    processed_data = {}

    for category, subcategories in data.items():
        processed_subcategories = [process_string(subcategory) for subcategory in subcategories]
        processed_data[category] = processed_subcategories

    return processed_data

@app.route('/categories', methods=['GET'])
def categories():
    cursor = mydb.cursor()
    try:
        if request.method == 'GET':
            
            cursor.execute("SELECT DISTINCT category FROM categories ORDER BY category ASC")

            results = cursor.fetchall()

            data = [{'category': row[0]} for row in results]

            category_list = {}

            for entry in data:
                category = entry['category']
                
                query = "SELECT subcategory FROM categories WHERE category = %s ORDER BY subcategory ASC"
                cursor.execute(query, (category,))

                results = cursor.fetchall()
               
                category_list[category] = [row[0] for row in results]

            category_list_clean = process_subcategories(category_list)

            return jsonify(category_list_clean)
        else:
            return jsonify({'message': 'Unsupported request method'})
    except Exception as e:
        return jsonify({'error': str(e)})
    finally:
        cursor.close()
