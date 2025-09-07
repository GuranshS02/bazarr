import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByFilters } from "../redux/slices/productsSlice";
import { useSearchParams } from 'react-router-dom';

const Collection = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  const [params] = useSearchParams();
  const searchTerm = params.get('search');

  const [filters, setFiltersState] = useState({
    brand: '',
    category: '',
    size: '',
    color: '',
    sort: '',
    gender: '',
  });

  // 🔥 Fetch products whenever search or filters change
  useEffect(() => {
    const allFilters = { ...filters };
    if (searchTerm) {
      allFilters.search = searchTerm;
    }
    dispatch(fetchProductByFilters(allFilters));
  }, [searchTerm, filters, dispatch]);

  // ✅ Update filters when user selects dropdown
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltersState((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Only sort on frontend (filtering handled by backend)
  const sortedProducts = [...products].sort((a, b) => {
    if (filters.sort === 'priceAsc') return a.price - b.price;
    if (filters.sort === 'priceDesc') return b.price - a.price;
    return 0;
  });

  // ✅ Get unique values for dropdowns
  const getUniqueValues = (key) => {
    return [...new Set(products.map((p) => p[key]).filter(Boolean))];
  };

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center">New in: Men</h1>

      {/* Filters */}
      <div className="bg-gray-100 p-4 rounded-2xl shadow-md">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">

          {/* Sort */}
          <select
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
            className="bg-white px-4 py-2 rounded-xl text-sm shadow focus:outline-none"
          >
            <option value="">Sort</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>

          {/* Brand */}
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

          {/* Category */}
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

          {/* Size */}
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

          {/* Color */}
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

          {/* Gender */}
          <select
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
            className="bg-white px-4 py-2 rounded-xl text-sm shadow focus:outline-none"
          >
            <option value="">Gender</option>
            {getUniqueValues('gender').map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {loading ? (
          <p className="col-span-full text-center text-gray-500">Loading...</p>
        ) : sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <div key={product._id} className="border p-3 rounded-md shadow hover:shadow-lg transition">
              <img
                src={product.image || product.images?.[0]?.url}
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
