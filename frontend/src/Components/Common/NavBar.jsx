import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineUser, HiOutlineShoppingBag } from 'react-icons/hi2'
import { AiOutlineHeart } from 'react-icons/ai'
import SearchBar from './SearchBar'
import ProfileDropdown from './ProfileDropdown'
import { useSelector } from "react-redux";

const NavBar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.cart.cart.products || []);
  const cartCount = products.reduce((acc, item) => acc + item.quantity, 0);


  return (
    <nav className="container mx-auto flex items-center justify-between py-4 px-6">
      <div className="flex items-center space-x-10">
        <Link to="/" className="text-2xl font-medium">
          BAZARR
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link
            to="/men"
            className="relative group text-gray-950 text-sm font-medium uppercase"
          >
            MEN
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            to="/women"
            className="relative group text-gray-950 text-sm font-medium uppercase"
          >
            WOMEN
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>
      </div>

      <SearchBar />

      <div className="flex items-center space-x-4">
        <Link
          to="/admin"
          className="block bg-black px-2 py-1 rounded text-sm text-white"
        >
          Admin
        </Link>

        <ProfileDropdown />

        <Link to="/cart" className="relative group">
          <HiOutlineShoppingBag className="w-6 h-6 text-gray-950" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2.5 bg-gray-950 text-white text-xs rounded-full px-2 py-0.5">
              {cartCount}
            </span>
          )}
        </Link>

        <Link to="/wishlist" className="relative group">
          <AiOutlineHeart className="w-6 h-6 text-gray-950 hover:scale-110 transition-all" />
          <span className="absolute -top-1 -right-2.5 bg-gray-950 text-white text-xs rounded-full px-2 py-0.5">
            4
          </span>
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
