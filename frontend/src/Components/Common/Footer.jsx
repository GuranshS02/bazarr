import React from 'react'
import {Link} from 'react-router-dom'
import { TbBrandMeta } from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io';
import { FaWhatsapp } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { TbCertificate } from 'react-icons/tb';    
import { FiRefreshCw } from 'react-icons/fi'; 
import FooterImg from '../../assets/footer.png'     



const Footer = () => {
  return (
    <footer className='border-t py-12'>
        <div className='relative h-[300px] md:h-[290px] lg:h-[250px] opacity-100 w-full bg-cover bg-center flex items-center text-white text-2xl md:text-4xl font-semibold italic px-4 mb-10'
        style={{backgroundImage: `url(${FooterImg})`}}>
            <div className='bg-opacity-50 p-6 rounded max-w-2xl mx-auto text-center'>
                "Where essentials become iconic."
            </div>
        </div>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0'>
            <div className='ml-4 md:ml-8'>
                <h3 className='text-lg text-gray-950 mb-4 font-medium'>ONLINE SHOPPING</h3>
                <ul className='space-y-2 text-gray-600'>
                    <li>
                        <Link to='#' className='hover:text-gray-500 transition-colors'>
                        Men
                        </Link>
                    </li>
                    <li>
                        <Link to='#' className='hover:text-gray-500 transition-colors'>
                        Women
                        </Link>
                    </li>
                    <li>
                        <Link to='#' className='hover:text-gray-500 transition-colors'>
                        Kids
                        </Link>
                    </li>
                    <li>
                        <Link to='#' className='hover:text-gray-500 transition-colors'>
                        Electronics
                        </Link>
                    </li>
                </ul>
            </div>

            <div>
                <h3 className='text-lg text-gray-950 mb-4 font-medium'>SUPPORT</h3>
                    <ul className='space-y-2 text-gray-600'>
                    <li>
                        <Link to='#' className='hover:text-gray-500 transition-colors'>
                        Contact Us
                        </Link>
                    </li>
                    <li>
                        <Link to='#' className='hover:text-gray-500 transition-colors'>
                        FAQ
                        </Link>
                    </li>
                    <li>
                        <Link to='#' className='hover:text-gray-500 transition-colors'>
                        T&C
                        </Link>
                    </li>
                    <li>
                        <Link to='#' className='hover:text-gray-500 transition-colors'>
                        Track Orders
                        </Link>
                    </li>
                    <li>
                        <Link to='#' className='hover:text-gray-500 transition-colors'>
                        Shipping
                        </Link>
                    </li>
                    <li>
                        <Link to='#' className='hover:text-gray-500 transition-colors'>
                        Cancellation
                        </Link>
                    </li>
                    <li>
                        <Link to='#' className='hover:text-gray-500 transition-colors'>
                        Returns
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <h3 className='text-lg text-gray-950 mb-4 font-medium'>FOLLOW US</h3>
                <div className='flex items-center space-x-4 mb-6'>
                    <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className='hover:text-gray-500'>
                        <TbBrandMeta className='h-6 w-6' />
                    </a>
                        <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className='hover:text-gray-500'>
                        <IoLogoInstagram className='w-6 h-6' />
                    </a>
                        <a
                    href="https://www.whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className='hover:text-gray-500'>
                         <FaWhatsapp className='w-6 h-6' />
                    </a>
                </div>
                <p className='text-gray-500'>CALL US</p>
                <p>
                    <FiPhoneCall className='inline-block mr-2' />
                    +1 (100) 110-011
                </p>
            </div>
            <div className='flex flex-col gap-6'>
                 <div className='flex items-start gap-3'>
            <TbCertificate className='w-6 h-6 text-gray-700 mt-1' />
            <p className='text-gray-600'>
                <span className='font-bold text-gray-950'>100% ORIGINAL</span> guarantee for <br />
                all products at bazarr.in
            </p>
        </div>
        <div className='flex items-start gap-3'>
            <FiRefreshCw className='w-6 h-6 text-gray-700 mt-1' />
            <p className='text-gray-600'>
                <span className='font-bold text-gray-950'>Return within 14 days</span> of <br />
                receiving your order
            </p>
        </div>
        </div>
        </div>


        <div className='container mx-auto mt-12 px-4 lg:px-0 border-gray-200 pt-6'>
            <p className='text-gray-500 text-sm tracking-tighter text-center'>
                &copy; 2025, Bazarr. All rights reserved.
            </p>
        </div>
    </footer>
  )
}

export default Footer