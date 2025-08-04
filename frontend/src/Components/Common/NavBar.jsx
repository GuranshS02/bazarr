import React from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineUser, HiOutlineShoppingBag,} from 'react-icons/hi2'
import {AiOutlineHeart} from 'react-icons/ai'
import SearchBar from './SearchBar'
import ProfileDropdown from './ProfileDropdown'
import { useCart } from '../Cart/CartContext'


const NavBar = () => {
  const { cartItems }= useCart()
  const cartCount= cartItems.reduce((total, items)=> total + items.quantity, 0)
  return (
    <>
    <nav className='container mx-auto flex items-center justify-between py-4 px-6'>
        <div>
            <Link to='/' className='text-2xl font-medium'>
            BAZARR
            </Link>
        </div>

        <div className='hidden md:flex space-x-6'>
            <Link to='/men' className='relative group text-gray-950 text-sm font-medium uppercase'>
            MEN
             <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to='/women' className='relative group text-gray-950 text-sm font-medium uppercase'>
            women
             <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to='/kids' className='relative group text-gray-950 text-sm font-medium uppercase'>
            kids
             <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to='#' className='relative group text-gray-950 text-sm font-medium uppercase'>
            electronics
             <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
        </div>

        <SearchBar />

        <div className='flex items-center space-x-4'>
          <ProfileDropdown />
            <span className='absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-950 transition-all duration-300 group-hover:w-full'></span>
            
           <Link to='/cart' className='relative group'>
           <HiOutlineShoppingBag className='w-6 h-6 text-gray-950' />
           <span className='absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-950 transition-all duration-300 group-hover:w-full'></span>
           {cartCount > 0 && (
           <span className='absolute -top-1 -right-2.5 bg-gray-950 text-white text-xs rounded-full px-2 py-0.5'>
           {cartCount}
           </span>
          )}
           </Link>

            <Link to="/wishlist" className='relative group'>
            <AiOutlineHeart className='w-6 h-6 text-gray-950 hover:scale-110 transition-all'/>
            <span className='absolute -top-1 -right-2.5 bg-gray-950 text-white text-xs rounded-full px-2 py-0.5'>4</span>
            </Link>
            </div>
    </nav>
    </>
  )
}

export default NavBar