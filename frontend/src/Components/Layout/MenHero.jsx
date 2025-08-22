import React from 'react';
import { Link } from 'react-router-dom';
import MenHeroVid from '../../assets/menmodalvid.mp4';
import MenTshirtM from '../../assets/tshirt4MEN.png'
import MenShirtM from '../../assets/SHIRTM.png'
import MenHoodiesM from '../../assets/HOODIESM.png'
import MenSweatshirtM from '../../assets/SWEATSHIRTM.png'
import MenJacketsM from '../../assets/JACKETSM.png'
import MenBottomM from '../../assets/BOTTOMM.png'
import { useState, useEffect } from 'react';

const MenHero = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:9000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const items = [
    { img: MenTshirtM, alt: 'Tshirt', label: 'T-Shirts' },
    { img: MenShirtM, alt: 'Shirt', label: 'Shirts' },
    { img: MenHoodiesM, alt: 'Hoodie', label: 'Hoodies' },
    { img: MenSweatshirtM, alt: 'SweatShirt', label: 'Sweatshirts' },
    { img: MenJacketsM, alt: 'Jacket', label: 'Jackets' },
    { img: MenBottomM, alt: 'Bottom', label: 'Bottomwear' },
  ];

  return (
    <>
      <section className='relative w-full overflow-hidden'>
        <video 
        src={MenHeroVid} 
        alt="MenHero"
        autoPlay
        muted
        loop
         className='w-full h-[700px] object-cover' />
        <div className='absolute inset-0 bg-black/30'></div>
        <div className='absolute inset-0 flex flex-col items-center justify-end pb-28'>
          <h2 className='text-white text-xl md:text-3xl font-semibold drop-shadow-lg mb-4'>NEW IN</h2>
        </div>
        <div className='absolute bottom-14 left-1/2 -translate-x-1/2'>
          <Link to="/collection" state={{ products }}>
            <button className='bg-black text-white font-semibold px-10 py-2 hover:bg-gray-800 transition-colors'>
              Shop Now
            </button>
          </Link>
        </div>
      </section>

      <section className='grid grid-cols-2 gap-0'>
        {items.map((item, index) => (
          <div key={index} className='relative group overflow-hidden'>
            <Link to="#">
              <img src={item.img} alt={item.alt} className='w-full h-[700px] object-cover' />
              <div className='absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300'></div>
              <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
                <p className='text-white text-2xl md:text-3xl font-semibold drop-shadow-lg'>{item.label}</p>
              </div>
              <div className='absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300'>
                <button className='relative inline-block px-8 py-3 font-semibold text-white group hover:text-black transition-colors duration-300'>
                  <span className='absolute inset-0 w-full h-full bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 z-0'></span>
                  <span className='relative z-10'>Shop {item.label}</span>
                </button>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default MenHero;
