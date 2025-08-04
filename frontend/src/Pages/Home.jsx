import React from 'react'
import Hero from '../Components/Layout/Hero'
import Category from '../Components/Layout/Category'
import FeaturedProducts from '../Components/Product/FeaturedProducts'
import FastSelling from '../Components/Product/FastSelling'
import Brands from '../Components/Layout/Brands'

const home = () => {
  return (
    <div>
        <Hero />
        <Category />
        <FeaturedProducts />
        <FastSelling />
        <Brands />
    </div>
  )
}

export default home