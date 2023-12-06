import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from AltexScraper import AltexScraper
from EmagScraper import EmagScraper
from FlancoScraper import FlancoScraper
import re

categories_to_scrape = ["console-jocuri/cpl/"]  
category = "console"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}
response = requests.get("https://www.altex.ro", headers=headers)
print(response)
# emag_scraper = AltexScraper(base_url="https://www.altex.ro")
# emag_scraper.scrape_all_categories(categories=categories_to_scrape)
# emag_scraper.print_products()
#emag_scraper.send_to_database(category)