import React from 'react'
import { Link } from 'react-router-dom'

import Levis from '../../assets/levislogo.jpg'
import Mango from '../../assets/mangologo.jpg'
import NewBalance from '../../assets/newbalancelogo.jpg'
import NorthFace from '../../assets/nflogo.jpg'
import Nike from '../../assets/nikelogo.jpg'
import Adidas from '../../assets/adidaslogo.jpg'


const brandLogos = [
  { name: 'levis', logo: Levis },
  { name: 'mango', logo: Mango },
  { name: 'nike', logo: Nike },
  { name: 'adidas', logo: Adidas },
  { name: 'northface', logo: NorthFace },
  { name: 'newbalance', logo: NewBalance },
]

const Brands = () => {
  return (
    <div className="container mx-auto px-10 py-8">
      <h2 className="text-4xl flex justify-center font-bold text-black mb-6">Top Brands</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-0 items-center">
        {brandLogos.map((brand, index) => (
          <div key={index} className="flex justify-center items-center">
            <Link to={`/brand/${brand.name}`}>
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-36 object-contain hover:grayscale-0 transition duration-300 mt-6"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Brands
