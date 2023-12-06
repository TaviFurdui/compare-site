import React, { useState, useEffect, useRef } from 'react';
import './Categories.css';

const Categories = ({ updateProducts, updateSearch }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const subcategoryRefs = useRef({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (subcategoryKey) => {
    const subcategory = subcategoryRefs.current[subcategoryKey].textContent;
    fetch('http://localhost:5000/search-by-category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category: subcategory.toLowerCase() }),
    })
      .then(response => response.json())
      .then(data => {
        updateProducts(data);
        updateSearch(subcategory.toLowerCase());
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleMouseEnter = (index) => {
    setActiveCategory(index);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  return (
    <div className="horizontal-menu">
      {Object.keys(categories).map((category, index) => (
        <div
          key={index}
          className={`menu-item ${activeCategory === index ? 'active' : ''}`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {category}
          {activeCategory === index && (
            <div className="subcategories">
              {categories[category].map((subcategory, subIndex) => (
                <div key={subIndex} ref={(el) => (subcategoryRefs.current[`${category}-${subIndex}`] = el)} // Assign a specific ref
                onClick={() => handleSearch(`${category}-${subIndex}`)}
                className="subcategory-item">
                  {subcategory}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Categories;
