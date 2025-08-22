import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiHeart } from "react-icons/fi";
import axios from "axios";

const FastSelling = () => {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef();

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:9000/api/products"); 
        // ✅ Replace with your actual backend endpoint
        setProducts(data);
      } catch (error) {
        console.error("Error fetching fast selling products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Scroll with buttons
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  // Smooth wheel horizontal scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      const atStart = container.scrollLeft === 0;
      const atEnd =
        Math.ceil(container.scrollLeft + container.clientWidth) >=
        container.scrollWidth;

      if (e.deltaY !== 0) {
        if ((e.deltaY < 0 && !atStart) || (e.deltaY > 0 && !atEnd)) {
          e.preventDefault(); // only prevent if horizontal scroll happens
          container.scrollBy({ left: e.deltaY, behavior: "smooth" });
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="relative container mx-auto px-10 py-8">
      <h2 className="text-4xl flex justify-center font-bold mb-6 text-black">
        Fast Selling Products
      </h2>

      {/* Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        <FiChevronRight className="w-6 h-6" />
      </button>

      {/* Product List */}
      <div
        ref={scrollRef}
        className="flex gap-6 w-full overflow-x-auto scroll-smooth no-scrollbar px-8 relative z-0"
      >
        {products.length > 0 ? (
          products.map((product, index) => (
            <Link
              to={`/product/${encodeURIComponent(product.title)}`}
              state={{ product }}
              key={index}
              className="relative min-w-[500px] border shadow-sm hover:shadow-md transition duration-300 bg-white"
            >
              <img
                src={product.images?.[0]?.url}
                alt={product.images?.[0]?.altText || product.title}
                className="w-full h-[500px] object-cover"
              />
              <button className="absolute top-3 right-3 bg-white p-1 rounded-full shadow hover:bg-gray-100 z-10">
                <FiHeart className="w-5 h-5 text-gray-700" />
              </button>
              <div className="px-4 py-3">
                <h3 className="text-md font-medium text-gray-800">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500">₹{product.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">Loading products...</p>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <Link to="/fast-selling-products">
          <button className="bg-black text-white font-semibold py-2 px-10">
            SHOP NOW
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FastSelling;
