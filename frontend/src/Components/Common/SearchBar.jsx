import React from 'react'
import { useState } from 'react'
import {FiSearch} from 'react-icons/fi'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductByFilters, setFilters } from '../../redux/slices/productsSlice';

const SearchBar = ({onSearch}) => {
    const[searchTerm, setSearchTerm]= useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit= (e)=>{
        e.preventDefault()
        dispatch(setFilters({search: searchTerm}))
        dispatch(fetchProductByFilters({search: searchTerm}))
        navigate(`/collection?search=${encodeURIComponent(searchTerm)}`);

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