import React from 'react';
import { Link } from 'react-router-dom';
import MenHeroImg from '../../assets/menB.png';
import TshirtModalImg from '../../assets/tshirtmodal.jpeg';
import ShirtModalImg from '../../assets/shirtmodal.jpeg';
import JacketModalImg from '../../assets/jacketmodal.jpeg';
import BottomModalImg from '../../assets/bottommodal.jpeg';
import HoodieModalImg from '../../assets/hoodiemodal.jpeg';
import SweatShirtModalImg from '../../assets/sweatshirtmodal.jpeg';
import FeaturedProducts, { products } from '../Product/FeaturedProducts';

const MenHero = () => {
  const items = [
    { img: TshirtModalImg, alt: 'Tshirt', label: 'T-Shirts' },
    { img: ShirtModalImg, alt: 'Shirt', label: 'Shirts' },
    { img: HoodieModalImg, alt: 'Hoodie', label: 'Hoodies' },
    { img: SweatShirtModalImg, alt: 'SweatShirt', label: 'Sweatshirts' },
    { img: JacketModalImg, alt: 'Jacket', label: 'Jackets' },
    { img: BottomModalImg, alt: 'Bottom', label: 'Bottomwear' },
  ];

  return (
    <>
      <section className='relative w-full overflow-hidden'>
        <img src={MenHeroImg} alt="MenHero" className='w-full h-[700px] object-cover' />
        <div className='absolute inset-0 bg-black/45'></div>
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
