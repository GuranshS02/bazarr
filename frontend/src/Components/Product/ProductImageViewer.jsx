import React, { useState } from 'react'

const ProductImageViewer = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images?.[0] || null)
  const [isFullScreen, setIsFullScreen] = useState(false)

  if (!images || images.length === 0) return null

  return (
    <>
      <div className='flex flex-col md:flex-row gap-6 ml-10'>
        <div className='flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto'>
          {images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={`Thumbnail ${index}`}
              onClick={() => setSelectedImage(img)}
              className={`w-16 h-16 object-cover border cursor-pointer rounded ${
                selectedImage?.url === img.url ? 'border-black' : 'border-gray-300'
              }`}
            />
          ))}
        </div>

        <div className='relative'>
          <img
            src={selectedImage?.url}
            alt={selectedImage?.altText || 'Selected Image'}
            className='w-[400px] md:w-[600px] h-auto cursor-pointer rounded'
            onClick={() => setIsFullScreen(true)}
          />
        </div>
      </div>

      {isFullScreen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50'
          onClick={() => setIsFullScreen(false)}
        >
          <img
            src={selectedImage?.url}
            alt={selectedImage?.altText || 'Fullscreen Image'}
            className='max-w-full max-h-full object-contain cursor-zoom-out'
          />
        </div>
      )}
    </>
  )
}

export default ProductImageViewer
