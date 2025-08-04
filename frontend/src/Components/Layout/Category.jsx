import React from 'react'
import Tshirt from '../../assets/tshirtc.png'
import Shirt from '../../assets/shirtc.png'
import Jeans from '../../assets/jeansc.png'
import Jackets from '../../assets/jacketc.png'
import Bags from '../../assets/bagsc.png'
import Shoes from '../../assets/shoesc.png'
import {Link} from 'react-router-dom'

const Category = () => {
  return (
    <>
    <div className='container mx-auto flex items-center justify-center px-10 py-6 mt-14'>
        <div className='flex flex-row gap-24'>
            <Link to='/category/tshirts' className='flex flex-col items-center'>
             <img
             src={Tshirt}
             alt="Tshirt" 
             className='w-28 h-28 rounded-full object-cover cursor-pointer hover:brightness-75 transition-300' />
               <span className='mt-2 text-sm font-medium text-gray-700'>T-Shirts</span>
             </Link>    

             <Link to='/category/shirts' className='flex flex-col items-center'>
             <img
             src={Shirt}
             alt="Shirt" 
             className='w-28 h-28 rounded-full object-cover cursor-pointer hover:brightness-75 transition-300' />
             <span className='mt-2 text-sm font-medium text-gray-700'>Shirts</span>
             </Link>   

             <Link to='/category/jackets' className='flex flex-col items-center'>
             <img
             src={Jackets}
             alt="Jacket" 
             className='w-28 h-28 rounded-full object-cover cursor-pointer hover:brightness-75 transition-300' />
             <span className='mt-2 text-sm font-medium text-gray-700'>Jackets</span>
             </Link>   

             <Link to='/category/jeans' className='flex flex-col items-center'>
             <img
             src={Jeans}
             alt="Jeans" 
             className='w-28 h-28 rounded-full object-cover cursor-pointer hover:brightness-75 transition-300' />
             <span className='mt-2 text-sm font-medium text-gray-700'>Jeans</span>
             </Link>   

             <Link to='/category/shoes' className='flex flex-col items-center'>
             <img
             src={Shoes}
             alt="Shoes" 
             className='w-28 h-28 rounded-full object-cover cursor-pointer hover:brightness-75 transition-300' />
             <span className='mt-2 text-sm font-medium text-gray-700'>Shoes</span>
             </Link>   

             <Link to='/category/bags' className='flex flex-col items-center'>
             <img
             src={Bags}
             alt="Bags" 
             className='w-28 h-28 rounded-full object-cover cursor-pointer hover:brightness-75 transition-300' />
             <span className='mt-2 text-sm font-medium text-gray-700'>Bags</span>
             </Link>   
        </div>
    </div>
    </>
  )
}

export default Category