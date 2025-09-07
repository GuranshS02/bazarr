import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineUser } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice'

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/')
  }

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

        {!user ? (
          <>
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
        </>
        ) : (
          <>
          <h3 className='text-sm font-bold text-black mb-2'>
            Hello, {user.name || 'User'}
          </h3>

            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <Link to="/my-account" className="hover:text-black">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-black">
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-black">
                  Wishlist
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full text-center bg-black text-white font-semibold py-2 text-sm mb-3 hover:bg-black transition rounded"
                >
                  Logout
                </button>
              </li>
            </ul>
            </>
        )}
      </div>
    </div>
  );
};

export default ProfileDropdown;
