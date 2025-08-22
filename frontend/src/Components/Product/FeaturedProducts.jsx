import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiHeart } from 'react-icons/fi';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef();

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:9000/api/products/featured');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fix for wheel scroll (preventDefault allowed)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      const canScrollLeft = container.scrollLeft > 0;
      const canScrollRight =
        container.scrollLeft + container.clientWidth < container.scrollWidth;

      // Only prevent default if horizontal scrolling is possible
      if (canScrollLeft || canScrollRight) {
        e.preventDefault();
        container.scrollBy({ left: e.deltaY, behavior: "smooth" });
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="relative container mx-auto px-10 py-8 mt-6">
      <h2 className="text-4xl flex justify-center font-bold mb-6 text-black">
        Featured Products
      </h2>

      {/* Left button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>

      {/* Right button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        <FiChevronRight className="w-6 h-6" />
      </button>

      {/* Product scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-6 w-full overflow-x-auto scroll-smooth no-scrollbar px-8"
      >
        {products.map((product, index) => (
          <Link
            to={`/product/${encodeURIComponent(product.title)}`}
            state={{ product }}
            key={index}
            className="relative min-w-[500px] border shadow-sm hover:shadow-md transition duration-300 bg-white"
          >
            <img
              src={product.images?.[0]?.url}
              alt={product.images?.[0]?.altText || product.title}
              className="w-[500px] h-[500px] object-cover"
            />
            <button className="absolute top-3 right-3 bg-white p-1 rounded-full shadow hover:bg-gray-100 z-10">
              <FiHeart className="w-5 h-5 text-gray-700" />
            </button>
            <div className="px-4 py-3">
              <h3 className="text-md font-medium text-gray-800">{product.title}</h3>
              <p className="text-sm text-gray-500">₹{product.price}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <Link to="/featured-products">
          <button className="bg-black text-white font-semibold py-2 px-10">
            SHOP NOW
          </button>
        </Link>
      </div>
    </div>
  );
}
