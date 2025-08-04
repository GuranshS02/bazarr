import React from 'react'
import BannerImg from '../../assets/banner.png'

const Hero = () => {
  return (
     <section className='relative'>
      <img
        src={BannerImg}
        alt="Hero"
        className='w-full h-[400px] md:h-[600px] lg:h-[700px] object-cover'
      />

      <div className='absolute inset-0 flex items-center justify-start pl-10 md:pl-20 pointer-events-none'>
        <div className='text-left text-black p-6 lg:mt-10 2xl:mt-5 pointer-events-auto'>
          <p className='text-gray-700 text-sm md:text-2xl mb-6'>
            #Big Fashion Sale
          </p>

          <h1 className='text-2xl md:text-7xl font-bold tracking-tighter uppercase mb-4'>
            Limited Time Offer! <br /> Up to 50% Off!
          </h1>

          <p className='text-gray-700 text-sm md:text-2xl mb-6'>
            Redefine Your Everyday Style
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero