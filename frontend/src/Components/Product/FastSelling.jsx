import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiHeart } from 'react-icons/fi';
import Jordan1 from '../../assets/blackshoes.png';
import Jordan2 from '../../assets/redshoes.png';
import Jordan3 from '../../assets/multishoes.png';
import Gilet from '../../assets/greygilet.png';
import Jacket from '../../assets/greyjacket.png';
import Jeans from '../../assets/greyjeans.png';
import Jeans2 from '../../assets/jeansblue.png';

export const products = [
  {
    id: 7,
    title: 'Straight Fit Jeans',
    description: 'Comfortable straight fit jeans perfect for daily wear.',
    price: 2399,
    discountPrice: 2199,
    countInStock: 12,
    sku: 'ZARA-JEANS-001',
    category: 'Jeans',
    brand: 'Zara',
    sizes: ['S', 'M', 'L'],
    colors: ['Blue'],
    collection: 'Casuals',
    gender: 'Unisex',
    images: [{ url: Jeans2, altText: 'Straight Fit Jeans' }],
    isFeatured: false,
    isPublished: true,
    rating: 4.3,
    numReviews: 21,
    tags: ['jeans', 'denim', 'casual'],
    weight: 0.6,
  },
  {
    id: 8,
    title: 'Relaxed Fit Washed Trousers',
    description: 'Washed trousers with a relaxed, baggy fit for all-day comfort.',
    price: 2999,
    discountPrice: 2799,
    countInStock: 10,
    sku: 'ZARA-TROUSERS-002',
    category: 'Jeans',
    brand: 'Zara',
    sizes: ['M', 'L'],
    colors: ['Grey'],
    collection: 'Streetwear',
    gender: 'Men',
    images: [{ url: Jeans, altText: 'Relaxed Fit Washed Trousers' }],
    isFeatured: false,
    isPublished: true,
    rating: 4.6,
    numReviews: 15,
    tags: ['trousers', 'streetwear'],
    weight: 0.5,
  },
  {
    id: 9,
    title: 'Puffer Technical Jacket',
    description: 'Insulated puffer jacket for winter with water resistance.',
    price: 2970,
    discountPrice: 2750,
    countInStock: 5,
    sku: 'ZARA-JACKET-005',
    category: 'Jackets',
    brand: 'Zara',
    sizes: ['M', 'L', 'XL'],
    colors: ['Grey'],
    collection: 'Winter',
    gender: 'Men',
    images: [{ url: Jacket, altText: 'Puffer Technical Jacket' }],
    isFeatured: false,
    isPublished: true,
    rating: 4.5,
    numReviews: 30,
    tags: ['jacket', 'winter'],
    weight: 1.2,
  },
  {
    id: 10,
    title: 'Air Jordan Retro High OG',
    description: 'Iconic Jordan High OG sneakers with premium leather.',
    price: 9999,
    discountPrice: 9499,
    countInStock: 8,
    sku: 'NIKE-JORDAN-HIGHOG',
    category: 'Shoes',
    brand: 'Nike',
    sizes: ['8', '9', '10'],
    colors: ['Red', 'Black'],
    collection: 'Sneakers',
    gender: 'Men',
    images: [{ url: Jordan2, altText: 'Air Jordan Retro High OG' }],
    isFeatured: true,
    isPublished: true,
    rating: 4.8,
    numReviews: 60,
    tags: ['shoes', 'jordan', 'retro'],
    weight: 1,
  },
  {
    id: 11,
    title: 'Jordan Spizike Low SE',
    description: 'Special Edition Jordan Spizike Low sneakers in multi-color.',
    price: 12999,
    discountPrice: 12499,
    countInStock: 6,
    sku: 'NIKE-SPIZIKE-LOWSE',
    category: 'Shoes',
    brand: 'Nike',
    sizes: ['9', '10', '11'],
    colors: ['Multi'],
    collection: 'Sneakers',
    gender: 'Unisex',
    images: [{ url: Jordan3, altText: 'Jordan Spizike Low SE' }],
    isFeatured: true,
    isPublished: true,
    rating: 4.9,
    numReviews: 38,
    tags: ['jordan', 'spizike', 'limited'],
    weight: 1.1,
  },
  {
    id: 12,
    title: 'Structured Gilet',
    description: 'Lightweight structured gilet perfect for layering.',
    price: 1699,
    discountPrice: 1599,
    countInStock: 7,
    sku: 'ZARA-GILET-003',
    category: 'Jackets',
    brand: 'Zara',
    sizes: ['S', 'M', 'L'],
    colors: ['Grey'],
    collection: 'Layering',
    gender: 'Unisex',
    images: [{ url: Gilet, altText: 'Structured Gilet' }],
    isFeatured: true,
    isPublished: true,
    rating: 4.2,
    numReviews: 19,
    tags: ['gilet', 'sleeveless'],
    weight: 0.4,
  },
  {
    id: 13,
    title: 'Jordan Spizike Low',
    description: 'Low-cut version of the iconic Jordan Spizike in classic black.',
    price: 11999,
    discountPrice: 11499,
    countInStock: 9,
    sku: 'NIKE-SPIZIKE-LOW',
    category: 'Shoes',
    brand: 'Nike',
    sizes: ['8', '9', '10'],
    colors: ['Black', 'Green'],
    collection: 'Sneakers',
    gender: 'Men',
    images: [{ url: Jordan1, altText: 'Jordan Spizike Low' }],
    isFeatured: false,
    isPublished: true,
    rating: 4.7,
    numReviews: 50,
    tags: ['shoes', 'jordan'],
    weight: 1,
  },
];

const FastSelling = () => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  const handleWheel = (e) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scroll({ left: e.deltaY, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative container mx-auto px-10 py-8">
      <h2 className="text-4xl flex justify-center font-bold mb-6 text-black">Fast Selling Products</h2>

      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        <FiChevronRight className="w-6 h-6" />
      </button>

      <div
        ref={scrollRef}
        onWheel={handleWheel}
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
              className="w-full h-[500px] object-cover"
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
        <Link to="/fast-selling-products">
          <button className="bg-black text-white font-semibold py-2 px-10">SHOP NOW</button>
        </Link>
      </div>
    </div>
  );
};

export default FastSelling;
