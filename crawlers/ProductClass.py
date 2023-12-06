class Product:
    def __init__(self, name, price, rating, image_url, product_url):
        self.name = name
        self.price = price
        self.rating = rating
        self.image_url = image_url
        self.product_url = product_url

    def __str__(self):
        return f"Product: {self.name}\nPrice: {self.price}\nRating: {self.rating}\nImage: {self.image_url}\nURL: {self.product_url}"