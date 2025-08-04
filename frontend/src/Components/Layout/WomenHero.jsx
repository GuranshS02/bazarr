import React from 'react'
import { Link } from 'react-router-dom'
import WomanModalVideo from '../../assets/womenModal.mp4'
import ShirtModalImg from '../../assets/wmoenshirtM.png'
import BagModalImg from '../../assets/womenbagM.png'
import BottomModalImg from '../../assets/womenbottomM.png'
import DressModalImg from '../../assets/womendressM.png'
import JacketModalImg from '../../assets/womenjacketM.png'
import KnitWearModalImg from '../../assets/womenknitwearM.png'

const WomenHero = () => {
  const items = [
    { img: ShirtModalImg, alt: 'Shirt', label: 'Shirts and Tops' },
    { img: DressModalImg, alt: 'Dress', label: 'Dresses' },
    { img: KnitWearModalImg, alt: 'KnitWear', label: 'Knitwears' },
    { img: BagModalImg, alt: 'Bag', label: 'Bags' },
    { img: JacketModalImg, alt: 'Jacket', label: 'Jackets' },
    { img: BottomModalImg, alt: 'Bottom', label: 'Bottomwear' },
  ]

  return (
    <>
      <section className='relative w-full overflow-hidden'>
        <video
          src={WomanModalVideo}
          alt="WomanModal"
          autoPlay
          muted
          loop
          playsInline
          className='w-full h-[700px] object-cover'
        />
        <div className='absolute inset-0 bg-black/30'></div>
        <div className='absolute inset-0 flex flex-col items-center justify-end pb-28'>
          <h2 className='text-white text-xl md:text-3xl font-semibold drop-shadow-lg mb-4'>
            NEW IN
          </h2>
        </div>
        <div className='absolute bottom-14 left-1/2 -translate-x-1/2'>
          <Link to="#">
            <button className='bg-black text-white font-semibold px-10 py-2 hover:bg-gray-800 transition-colors'>
              Shop Now
            </button>
          </Link>
        </div>
      </section>

      <section className='grid grid-cols-2 gap-0'>
        {items.map((item, index) => (
          <div key={index} className='relative group overflow-hidden'>
            <Link to="#">
              <img
                src={item.img}
                alt={item.alt}
                className='w-full h-[700px] object-cover'
              />
              <div className='absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300'></div>

              <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
                <p className='text-white text-2xl md:text-3xl font-semibold drop-shadow-lg'>
                  {item.label}
                </p>
              </div>

              <div className='absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300'>
                <button className='relative inline-block px-8 py-3 font-semibold text-white group hover:text-black transition-colors duration-300'>
                    <span className='absolute inset-0 w-full h-full bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 z-0'></span>
                 <span className='relative z-10'>Shop {item.label}</span>
                </button>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </>
  )
}

export default WomenHero
