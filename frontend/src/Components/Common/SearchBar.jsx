import React from 'react'
import { useState } from 'react'
import {FiSearch} from 'react-icons/fi'

const SearchBar = ({onSearch}) => {
    const[searchTerm, setSearchTerm]= useState("");

    const handleSubmit= (e)=>{
        e.preventDefault()
        console.log("Search Term:", searchTerm)
    }
  return (
    <div className='max-w-xl w-full'>
    <form onSubmit={handleSubmit} className='flex items-center border rounded overflow-hidden'>
        <input
        type="text"
        placeholder="Search Products"
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        className='px-4 py-2 w-full outline-none' />
        <button type="submit" className='bg-gray-950 text-white px-4 py-3 flex items-center gap-2'>
            <FiSearch />
        </button>
    </form>
    </div>
    
  )
}

export default SearchBar