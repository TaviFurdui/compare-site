import React, { useState } from 'react';
import './Filter.css';

function getItemsByShop(products, shopName) {
    return products.filter(product => product['shop'] == shopName);
}

const ShopFilter = ({ products, onShopFilterChange }) => {
    const [selectedFilter, setSelectedFilter] = useState('');

    const handleFilterChange = (event) => {
        const filterValue = event.target.value;
        setSelectedFilter(filterValue);
        let filteredProducts = products;
        filteredProducts = getItemsByShop(filteredProducts, filterValue);
        onShopFilterChange(filteredProducts);
    };

    return (
        <div className="filter-container">
            <label htmlFor="filter">Filtrează după:</label>
            <select id="filter" value={selectedFilter} onChange={handleFilterChange}>
                <option value="">Selectează filtru</option>
                <option value="emag">Emag</option>
                <option value="flanco">Flanco</option>
            </select>
        </div>

    );
};

export default ShopFilter;
