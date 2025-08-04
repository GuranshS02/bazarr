import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiHeart } from 'react-icons/fi';
import Tshirt from '../../assets/TshirtPro.png';
import Shirt from '../../assets/shirtPro.png';
import Jacket1 from '../../assets/jacketPro.png';
import leather1 from '../../assets/leatherjacket2.png';
import leather2 from '../../assets/leatherjacket3.png';
import leather3 from '../../assets/leatherjacket4.png';
import Jacket2 from '../../assets/jacketPro2.png';
import Jacket3 from '../../assets/jacketPro3.png';
import Vest from '../../assets/vestPro.png';

export const products = [
  {
    id: 1,
    title: 'Leather Jacket',
    description: 'Premium leather jacket with soft inner lining and durable zipper.',
    price: 1999,
    discountPrice: 1499,
    brand: 'Zara',
    brandDescription: 'Known for its trend-driven designs and contemporary vibes, Spanish fashion giant Zara has been redefining high-street style since the late 70s. Originally rooted in chic basics and wardrobe staples, the brand now offers a wide range of sleek tailoring, statement outerwear, effortless dresses, shoes, and accessories. Scroll the Zara at ASOS edit to discover the latest drops from the label’s polished yet wearable collection.',
    category: 'Jackets',
    images: [
      { url: leather1, altText: 'Leather Jacket Front' },
      { url: leather2, altText: 'Leather Jacket Side' },
      { url: leather3, altText: 'Leather Jacket Back' }
    ],
    colors: ['Black'],
    sizes: ['M', 'L', 'XL'],
    collection: 'Winter',
    gender: 'Men',
    rating: 4.8,
    numReviews: 56,
    tags: ['bestseller', 'leather', 'winter'],
    weight: '1.2kg',
    countInStock: 30,
    isFeatured: true,
    isPublished: true,
    sku: 'ZARA-JACK-BLK-01'
  },
  {
    id: 2,
    title: 'Washed Boxy Fit Jacket',
    description: 'Trendy washed jacket with a boxy silhouette and rugged look.',
    price: 1799,
    discountPrice: 1599,
    brand: 'Zara',
    brandDescription: 'Known for its trend-driven designs and contemporary vibes, Spanish fashion giant Zara has been redefining high-street style since the late 70s. Originally rooted in chic basics and wardrobe staples, the brand now offers a wide range of sleek tailoring, statement outerwear, effortless dresses, shoes, and accessories. Scroll the Zara at ASOS edit to discover the latest drops from the label’s polished yet wearable collection.',
    category: 'Jackets',
    images: [{ url: Jacket2, altText: 'Washed Boxy Fit Jacket' }],
    colors: ['Grey'],
    sizes: ['M', 'L', 'XL'],
    collection: 'Winter',
    gender: 'Men',
    rating: 4.3,
    numReviews: 38,
    tags: ['winter', 'casual'],
    weight: '1.0kg',
    countInStock: 25,
    isFeatured: true,
    isPublished: true,
    sku: 'ZARA-JACK-GRY-02'
  },
  {
    id: 3,
    title: 'Denim Jacket',
    description: 'Stylish black denim jacket with a relaxed fit for everyday wear.',
    price: 1799,
    discountPrice: 1599,
    brand: 'Zara',
    brandDescription: 'Known for its trend-driven designs and contemporary vibes, Spanish fashion giant Zara has been redefining high-street style since the late 70s. Originally rooted in chic basics and wardrobe staples, the brand now offers a wide range of sleek tailoring, statement outerwear, effortless dresses, shoes, and accessories. Scroll the Zara at ASOS edit to discover the latest drops from the label’s polished yet wearable collection.',
    category: 'Jackets',
    images: [{ url: Jacket3, altText: 'Denim Jacket' }],
    colors: ['Black'],
    sizes: ['M', 'L', 'XL'],
    collection: 'Winter',
    gender: 'Men',
    rating: 4.5,
    numReviews: 44,
    tags: ['denim', 'bestseller'],
    weight: '1.1kg',
    countInStock: 28,
    isFeatured: true,
    isPublished: true,
    sku: 'ZARA-JACK-BLK-03'
  },
  {
    id: 4,
    title: 'Faded Relaxed Fit T-Shirt',
    description: 'Comfortable and relaxed charcoal t-shirt with faded design.',
    price: 899,
    discountPrice: 699,
    brand: 'Zara',
    brandDescription: 'Known for its trend-driven designs and contemporary vibes, Spanish fashion giant Zara has been redefining high-street style since the late 70s. Originally rooted in chic basics and wardrobe staples, the brand now offers a wide range of sleek tailoring, statement outerwear, effortless dresses, shoes, and accessories. Scroll the Zara at ASOS edit to discover the latest drops from the label’s polished yet wearable collection.',
    category: 'T-Shirts',
    images: [{ url: Tshirt, altText: 'Faded Relaxed Fit T-Shirt' }],
    colors: ['Charcoal'],
    sizes: ['M', 'L', 'XL'],
    collection: 'Casual',
    gender: 'Unisex',
    rating: 4.2,
    numReviews: 24,
    tags: ['casual', 'tshirt'],
    weight: '0.3kg',
    countInStock: 45,
    isFeatured: true,
    isPublished: true,
    sku: 'ZARA-TSH-CHAR-04'
  },
  {
    id: 5,
    title: 'Leather Effect Overshirt',
    description: 'A sleek overshirt with leather effect finish, perfect for layering.',
    price: 999,
    discountPrice: 799,
    brand: 'Zara',
    brandDescription: 'Known for its trend-driven designs and contemporary vibes, Spanish fashion giant Zara has been redefining high-street style since the late 70s. Originally rooted in chic basics and wardrobe staples, the brand now offers a wide range of sleek tailoring, statement outerwear, effortless dresses, shoes, and accessories. Scroll the Zara at ASOS edit to discover the latest drops from the label’s polished yet wearable collection.',
    category: 'Shirts',
    images: [{ url: Shirt, altText: 'Leather Effect Overshirt' }],
    colors: ['Black'],
    sizes: ['M', 'L', 'XL'],
    collection: 'Formal',
    gender: 'Men',
    rating: 4.4,
    numReviews: 31,
    tags: ['formal', 'overshirt'],
    weight: '0.8kg',
    countInStock: 35,
    isFeatured: true,
    isPublished: true,
    sku: 'ZARA-OVER-BLK-05'
  },
  {
    id: 6,
    title: 'Washed Fleece Gilet',
    description: 'Lightweight fleece gilet ideal for layering during cool weather.',
    price: 899,
    discountPrice: 749,
    brand: 'Zara',
    brandDescription: 'Known for its trend-driven designs and contemporary vibes, Spanish fashion giant Zara has been redefining high-street style since the late 70s. Originally rooted in chic basics and wardrobe staples, the brand now offers a wide range of sleek tailoring, statement outerwear, effortless dresses, shoes, and accessories. Scroll the Zara at ASOS edit to discover the latest drops from the label’s polished yet wearable collection.',
    category: 'Vests',
    images: [{ url: Vest, altText: 'Washed Fleece Gilet' }],
    colors: ['Grey'],
    sizes: ['M', 'L', 'XL'],
    collection: 'Summer',
    gender: 'Men',
    rating: 4.1,
    numReviews: 18,
    tags: ['summer', 'fleece'],
    weight: '0.6kg',
    countInStock: 20,
    isFeatured: true,
    isPublished: true,
    sku: 'ZARA-VEST-GRY-06'
  }
];

const FeaturedProducts = () => {
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
    <div className="relative container mx-auto px-10 py-8 mt-6">
      <h2 className="text-4xl flex justify-center font-bold mb-6 text-black">Featured Products</h2>

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
          <button className="bg-black text-white font-semibold py-2 px-10">SHOP NOW</button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
