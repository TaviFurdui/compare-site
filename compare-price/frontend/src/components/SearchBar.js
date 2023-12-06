import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ updateProducts, updateSearch  }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    fetch('http://localhost:5000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchTerm: searchTerm }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        updateProducts(data);
        updateSearch(searchTerm);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='search-bar'>
      <input
        type="text"
        placeholder="Cauti ceva anume?"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Caută</button>
    </div>
  );
};

export default SearchBar;