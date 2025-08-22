import React from 'react'
import TopBar from '../Layout/TopBar'
import NavBar from './NavBar'

const Header = () => {
  return (
    <header className='border-b border-gray-300 shadow-sm'>
       <NavBar />
    </header>
  )
}

export default Header