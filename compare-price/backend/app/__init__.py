from flask import Flask
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

db_config = {
    'host': 'localhost',
    'user': 'root',
    'database': 'products',
}

mydb = mysql.connector.connect(**db_config)

from app.routes import search, categories, search_by_category
