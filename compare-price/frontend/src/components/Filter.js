import React, { useState } from 'react';
import './Filter.css';

const convertStringToFloat = (stringValue) => {
  const stringNumber = stringValue.replace('.', '').replace(',', '.');
  const floatValue = parseFloat(stringNumber);
  return floatValue;
};

const sortProducts = (products, sortBy, order) => {
    if (sortBy == 'price'){
        return [...products].sort((a, b) => {
            if (convertStringToFloat(a[sortBy]) > convertStringToFloat(b[sortBy])) return order;
            if (convertStringToFloat(a[sortBy]) < convertStringToFloat(b[sortBy])) return -order;
            return 0;
          });
    }
    if (sortBy == 'rating'){
        return [...products].sort((a, b) => {
            console.log(parseFloat(a[sortBy]));
            if (parseFloat(a[sortBy]) > parseFloat(b[sortBy])) return order;
            if (parseFloat(a[sortBy]) < parseFloat(b[sortBy])) return -order;
            return 0;
          });
    }
};

const Filter = ({ products, onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    setSelectedFilter(filterValue);

    let filteredProducts = [...products];

    switch (filterValue) {
      case 'price-asc':
        filteredProducts = sortProducts(filteredProducts, 'price', 1);
        break;
      case 'price-desc':
        filteredProducts = sortProducts(filteredProducts, 'price', -1);
        break;
      case 'review-asc':
        filteredProducts = sortProducts(filteredProducts, 'rating', 1);
        break;
      case 'review-desc':
        filteredProducts = sortProducts(filteredProducts, 'rating', -1);
        break;
      default:
        break;
    }

    onFilterChange(filteredProducts);
  };

  return (
    <div className="filter-container">
        <label htmlFor="filter">Sortează după:</label>
        <select id="filter" value={selectedFilter} onChange={handleFilterChange}>
            <option value="">Selectează filtru</option>
            <option value="price-asc">Preţ crescător</option>
            <option value="price-desc">Preţ descrescător</option>
            <option value="review-asc">Rating crescător</option>
            <option value="review-desc">Rating descrescător</option>
        </select>
    </div>

  );
};

export default Filter;
