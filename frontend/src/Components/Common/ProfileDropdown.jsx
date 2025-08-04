import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineUser } from 'react-icons/hi';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="relative group cursor-pointer flex items-center">
        <HiOutlineUser className="w-6 h-6" />
         <span className='absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-950 transition-all duration-300 group-hover:w-full'></span>
      </div>

      <div
        className={`absolute right-0 mt-2 w-64 bg-white border shadow-lg z-50 p-4 text-left transition-all duration-200 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <h3 className="text-sm font-medium text-gray-600 mb-2">Welcome</h3>
        <p className="text-sm text-gray-500 mb-4">
          To access account and manage orders
        </p>
        <Link
          to="/login"
          className="block w-full text-center bg-black text-white font-semibold py-2 text-sm mb-3 hover:bg-black transition rounded"
        >
          LOGIN / SIGNUP
        </Link>

        <ul className="space-y-2 text-sm text-gray-700">
          <li className="hover:text-black cursor-pointer">Orders</li>
          <li className="hover:text-black cursor-pointer">Wishlist</li>
          <li className="hover:text-black cursor-pointer">Gift Cards</li>
          <li className="hover:text-black cursor-pointer">Contact Us</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileDropdown;
