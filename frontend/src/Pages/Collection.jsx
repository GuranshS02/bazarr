import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Collection = () => {
  const location = useLocation();
  const productsFromState = location.state?.products || [];

  const [filters, setFilters] = useState({
    brand: '',
    category: '',
    size: '',
    color: '',
    sort: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredProducts = productsFromState
    .filter((product) => {
      return (
        (!filters.brand || product.brand === filters.brand) &&
        (!filters.category || product.category === filters.category) &&
        (!filters.size || product.size === filters.size) &&
        (!filters.color || product.color === filters.color)
      );
    })
    .sort((a, b) => {
      if (filters.sort === 'Price: Low to High') return a.price - b.price;
      if (filters.sort === 'Price: High to Low') return b.price - a.price;
      return 0;
    });

  const getUniqueValues = (key) => {
    return [...new Set(productsFromState.map((p) => p[key]).filter(Boolean))];
  };

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center">New in: Men</h1>

      {/* Stylish Filter Bar */}
      <div className="bg-gray-100 p-4 rounded-2xl shadow-md">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <select
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
            className="bg-white px-4 py-2 rounded-xl text-sm shadow focus:outline-none"
          >
            <option value="">Sort</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
          </select>

          <select
            name="brand"
            value={filters.brand}
            onChange={handleFilterChange}
            className="bg-white px-4 py-2 rounded-xl text-sm shadow focus:outline-none"
          >
            <option value="">Brand</option>
            {getUniqueValues('brand').map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="bg-white px-4 py-2 rounded-xl text-sm shadow focus:outline-none"
          >
            <option value="">Category</option>
            {getUniqueValues('category').map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <select
            name="size"
            value={filters.size}
            onChange={handleFilterChange}
            className="bg-white px-4 py-2 rounded-xl text-sm shadow focus:outline-none"
          >
            <option value="">Size</option>
            {getUniqueValues('size').map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <select
            name="color"
            value={filters.color}
            onChange={handleFilterChange}
            className="bg-white px-4 py-2 rounded-xl text-sm shadow focus:outline-none"
          >
            <option value="">Color</option>
            {getUniqueValues('color').map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="border p-3 rounded-md shadow hover:shadow-lg transition">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-[500px] object-cover rounded"
              />
              <h3 className="mt-2 font-semibold text-sm">{product.title}</h3>
              <p className="text-gray-600 text-sm">₹{product.price}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">No products found</p>
        )}
      </div>
    </div>
  );
};

export default Collection;
