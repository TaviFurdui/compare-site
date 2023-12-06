import React from 'react';
import './Product.css';
import RatingStars from './RatingStars';

const Products = ({ products }) => {
  return (
    <div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {products.map(product => (
            <a href={product.url} key={product.id} className="product-card">
                <img
                    className="product-image"
                    src={product.image_url}
                    alt={product.name}
                />
                <div className="product-info">
                    <div className='product-shop'>Magazin: {product.shop}</div>
                    <hr></hr>
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">{product.price} RON</div>
                    <div className="product-rating">
                        <RatingStars rating={product.rating} />
                        {product.rating}
                    </div>
                </div>
            </a>
        ))}
      </div>
    </div>
  );
};

export default Products;