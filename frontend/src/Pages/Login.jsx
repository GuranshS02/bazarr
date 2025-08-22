import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../redux/slices/authSlice'
import { useDispatch } from 'react-redux'

const Login = () => {
const navigate=useNavigate()
const dispatch = useDispatch()

const handleSubmit=(e)=> {
    e.preventDefault()
    const email=e.target.elements.email.value
    const password=e.target.elements.password.value
    if (!email || !password) return
    
    dispatch(loginUser({email, password}))
}
  return (
    <div className='min-h-screen flex items-center justify-center bg-white px-4 sm:px-6'>
        <div className='max-w-md w-full text-center'>
            <div className='mx-auto text-black font-medium flex items-center justify-center text-3xl mb-10'>
                <Link to='/'>
                BAZARR
                </Link>
            </div>

            <p className='text-gray-600 flex justify-start text-sm mb-6'>Enter your email to sign or join for</p>

            <div className='flex flex-col sm:flex-row justify-start text-sm mb-8 gap-6 sm:gap-4'>
                <div className='flex flex-col items-start sm:w-1/3'>
                <img
                src='https://img.icons8.com/ios/50/tag-window.png'
                alt="discount"
                className='w-8 h-8 mb-2'
                />
                <span className='text-xs text-center'>Exclusive discounts</span>
                </div>
                <div className='flex flex-col items-center sm:w-1/3'>
                <img
                src='https://img.icons8.com/ios/50/delivery.png'
                alt="tracking"
                className='w-8 h-8 mb-2'
                />
                <span className='text-xs text-center'>Easily tracked deliveries and returns</span>
                </div>
                 <div className='flex flex-col items-center sm:w-1/3'>
                <img
                src='https://static.thenounproject.com/png/575865-512.png'
                alt="checkout"
                className='w-10 h-10 mb'
                />
                <span className='text-xs text-center'>Speedy checkouts</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className='text-left'>
                <label htmlFor='email' className='block text-sm font-medium mb-1'>
                    EMAIL:*
                </label>
                <input
                type='email'
                id='email'
                required
                className='w-full px-4 py-2 border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-black rounded'/>

                <label htmlFor='password' className='block text-sm font-medium mb-1'>Password:*</label>
                <input
                type='password'
                id='password'
                required
                className='w-full px-4 py-2 border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-black rounded'/>

                <button
                type='submit'
                className='w-full bg-black text-white py-2 font-bold rounded hover:opacity-90 transition'>
                    CONTINUE
                </button>
            </form>

            <p className='text-sm mt-4'>
              New User?{' '}
              <Link to='/signup-details' className='text-black hover:underline'>
              Sign up here
              </Link>
            </p>

            <div className='flex items-center my-6'>
                <hr className='flex-grow border-gray-300' />
                <span className='mx-3 text-gray-500 text-sm'>or continue with</span>
                <hr className='flex-grow border-gray-300' />
            </div>
                <div className="flex justify-center gap-4">
          <img
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="Google"
            className="w-8 h-8 cursor-pointer hover:scale-110 transition"
          />
          <img
            src="https://img.icons8.com/color/48/facebook-new.png"
            alt="Facebook"
            className="w-8 h-8 cursor-pointer hover:scale-110 transition"
          />
          <img
            src="https://img.icons8.com/ios-filled/50/mac-os.png"
            alt="Apple"
            className="w-8 h-8 cursor-pointer hover:scale-110 transition"
          />
        </div>
        </div>

    </div>
  )
}

export default Login