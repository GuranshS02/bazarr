import React from 'react'
import FeaturedProducts from '../Components/Product/FeaturedProducts'
import FastSelling from '../Components/Product/FastSelling'
import Brands from '../Components/Layout/Brands'
import BazarrTheEdit from '../assets/homePageBanner2.mp4'
import WinterEdit from '../assets/winteredit.mp4'

const home = () => {
  return (
    <div>

        <div className="relative w-full h-screen mt-6 bg-white px-4 sm:px-4 lg:px-8">
  <div className="relative w-full h-full overflow-hidden">
    <video
      className="w-full h-[700px] object-cover"
      src={WinterEdit}
      autoPlay
      muted
      loop
    />
    <div className="absolute inset-0 bg-black/20"></div>

    <div className="absolute inset-0 flex flex-col justify-start px-6 sm:px-8 lg:px-12 pt-24 text-left">
      <h1 className="text-4xl sm:text-5xl font-bold text-white">
        Winter Édition
      </h1>
      <p className="mt-4 text-lg sm:text-xl text-white max-w-lg">
        “Essential silhouettes. Seasonal distinction.”
      </p>

      <div className="mt-6 flex gap-6">
        <button className="text-white font-semibold border-b-2 border-white px-4 py-2 transition-all duration-300 hover:bg-white hover:text-black">
          FOR HER
        </button>
        <button className="text-white font-semibold border-b-2 border-white px-4 py-2 transition-all duration-300 hover:bg-white hover:text-black">
          FOR HIM
        </button>
      </div>
    </div>
  </div>
</div>



<div className="relative w-full h-screen mt-6 bg-white px-4 sm:px-4 lg:px-8">
  <div className="relative w-full h-full overflow-hidden">
    <video
      className="w-full h-full object-cover"
      src={BazarrTheEdit}
      autoPlay
      muted
      loop
    />
    <div className="absolute inset-0 bg-black/20"></div>

    <div className="absolute inset-0 flex flex-col justify-start px-6 sm:px-8 lg:px-12 pt-24 text-left">
      <h1 className="text-4xl sm:text-5xl font-bold text-white">
        Bazarr - The Edit
      </h1>
      <p className="mt-4 text-lg sm:text-xl text-white max-w-lg">
        Minimal form, maximum statement — monochrome precision meets the raw pulse of modern rebellion.
      </p>

      <div className="mt-6 flex gap-6">
        <button className="text-white font-semibold border-b-2 border-white px-4 py-2 transition-all duration-300 hover:bg-white hover:text-black">
          FOR HER
        </button>
        <button className="text-white font-semibold border-b-2 border-white px-4 py-2 transition-all duration-300 hover:bg-white hover:text-black">
          FOR HIM
        </button>
      </div>
    </div>
  </div>
</div>


        <FeaturedProducts />
        <FastSelling />
        <Brands />
    </div>
  )
}

export default home