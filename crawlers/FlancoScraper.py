import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
import re
from ProductClass import Product
import mysql.connector

class FlancoScraper:
    def __init__(self, base_url):
        self.base_url = base_url
        self.products = []
                
    def transform_percentage_to_rating(self, percentage_str):
        try:
            percentage = int(percentage_str.strip('%'))
            rating = round(percentage / 20.0, 1)
            rating = max(0.0, min(5.0, rating))
            return str(rating)
        
        except ValueError:
            return "Invalid percentage format"
    
    def scrape_products(self, url):
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            response = requests.get(url, headers=headers)

            soup = BeautifulSoup(response.content, "html.parser")

            product_containers = soup.find_all("li", class_="produs")

            for product_container in product_containers:
                try:
                    product_name = product_container.find("strong", class_="product-item-name").text.strip()

                    try:
                        product_price = product_container.find("span", class_="special-price").text.strip()
                    except AttributeError:
                        try:
                            product_price = product_container.find("span", class_="singlePrice").text.strip()
                        except AttributeError:
                            product_price = str(0)
                    
                    try: 
                        product_rating = product_container.find("div", class_="rating-result")
                        product_rating = product_rating.find(True).find(True).text.strip()
                        product_rating = self.transform_percentage_to_rating(product_rating)
                    except AttributeError:
                        product_rating = str(0)

                    try: 
                        product_image = product_container.find("img").get('src')
                        pattern = r'https://[^\s]+'
                        product_image = re.findall(pattern, product_image)[0]
                    except AttributeError:
                        product_image = ''

                    try: 
                        product_url = product_container.find("a", class_='product-item-photo').get('href')
                    except AttributeError:
                        product_url = ''
                        
                    product_instance = Product(name=product_name, price=product_price, rating=product_rating, image_url=product_image, product_url=product_url)
                    self.products.append(product_instance)
                except AttributeError:
                    print("Error parsing product information.")

            next_page = soup.find('a', class_='next')
            if next_page:
                next_url = next_page["href"]
                self.scrape_products(next_url)

        except requests.RequestException as e:
            print(f"Failed to retrieve the webpage. Error: {e}")

    def scrape_all_categories(self, categories):
        for category in categories:
            category_url = f"{self.base_url}/{category}"
            self.scrape_products(url=category_url)

    def send_to_database(self, category):
        try:
            # Update these values with your XAMPP MySQL credentials
            db_config = {
                'host': 'localhost',
                'user': 'root',
                'password': '',
                'database': 'products',
                'port': 3306
            }

            connection = mysql.connector.connect(**db_config)
            cursor = connection.cursor()

            # Replace 'your_table_name' with the actual name of your table
            insert_query = "INSERT INTO products (name, price, rating, url, image_url, shop, category) VALUES (%s, %s, %s, %s, %s, %s, %s)"

            for product in self.products:
                data_to_insert = (product.name, product.price, product.rating, product.product_url, product.image_url, "FLANCO", category)
                cursor.execute(insert_query, data_to_insert)

            connection.commit()

        except Exception as e:
            print(f"An error occurred while sending data to the database: {e}")

        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

    def print_products(self):
        for i, product in enumerate(self.products, start=1):
            print(f"{i}. Product Name: {product.name}")
            print(f"   Price: {product.price}")
            print(f"   Rating: {product.rating}")
            print(f"   Image url: {product.image_url}")
            print(f"   Product url: {product.product_url}")
            print()