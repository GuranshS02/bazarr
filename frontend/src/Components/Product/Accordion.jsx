import React from 'react'
import { useState } from 'react'
import { FiPlus, FiMinus } from 'react-icons/fi'

const Accordion = ({title, content}) => {
    const [isOpen, setIsOpen]= useState(false)

  return (
    <div className='border-b w-full'>
        <button
        onClick={() => setIsOpen(!isOpen)}
            className='flex justify-between items-center w-full py-4 text-left font-semibold text-gray-800'>
           <span>{title}</span>
           {isOpen ? <FiMinus /> : <FiPlus />}
            </button>
            {isOpen && (
                <div className='pb-4 text-sm text-gray-600'>
                    <div className='w-full'>
                    {typeof content === 'string' ? <p>{content}</p> : content}
                    </div>
                    </div>
            )}
    </div>
  )
}

export default Accordion