import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import Products from './components/Product';
import Pagination from './components/Pagination';
import Filter from './components/Filter';
import ShopFilter from './components/ShopFilter'
import Categories from './components/Categories';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const updateProducts = (newProducts) => {
    setProducts(newProducts);
  };

  const updateSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const itemsPerPage = 30;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleFilterChange = (filteredData) => {
    setProducts(filteredData);
  };
  return (
    <div className="App">
        <Categories className='categories' updateProducts={updateProducts} updateSearch={updateSearch}></Categories>
        <div className='searchDiv'>
          <SearchBar updateProducts={updateProducts} updateSearch={updateSearch} className="SearchBar"></SearchBar>
        </div>
        {searchTerm != '' && (
          <div>
            <h2 className='searched-product'>Rezultate pentru: {searchTerm}</h2>
            <div className='filters'>
              <Filter products={products} onFilterChange={handleFilterChange}/>
              {/* <ShopFilter products={products} onShopFilterChange={handleFilterChange}/> */}
            </div>
            <hr></hr>
          </div>
        )}
        <div className='products-list'>
          <Products products={currentItems} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    </div>
  );
}

export default App;
