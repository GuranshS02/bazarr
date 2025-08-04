import React from 'react';
import { TbBrandMeta } from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io';
import { FaWhatsapp } from 'react-icons/fa';

const TopBar = () => {
  return (
    <div className='bg-black text-white'>
      <div className='container mx-auto flex justify-between items-center py-1 px-6'>
        
        {/* Social Icons */}
        <div className='hidden md:flex items-center space-x-3'>
          <a href='#' className='hover:text-gray-400'>
            <TbBrandMeta className='w-6 h-6' />
          </a>
          <a href='#' className='hover:text-gray-400'>
            <IoLogoInstagram className='w-6 h-6' />
          </a>
          <a href='#' className='hover:text-gray-400'>
            <FaWhatsapp className='w-6 h-6' />
          </a>
        </div>

        {/* Center Message */}
        <div className='text-sm text-center'>
          <span>Free Shipping above ₹999</span>
        </div>

        {/* Contact Number */}
        <div className='text-sm hidden md:block'>
          <a href='tel:+1100110011' className='hover:text-gray-400'>
            +1 (100) 110-011
          </a>
        </div>

      </div>
    </div>
  );
};

export default TopBar;
