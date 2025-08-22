import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Accordion from './Accordion'
import SizeGuideDrawer from './SizeGuide'
import ProductImageViewer from './ProductImageViewer'
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";


const ProductDetails = () => {
  const dispatch = useDispatch()
  const [showDrawer, setShowDrawer] = useState(false)
  const { state } = useLocation()
  const { productName } = useParams()

  const product = state?.product

  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (product) {
      setSelectedColor(product.colors?.[0] || '')
      setSelectedSize(product.sizes?.[0] || '')
    }
  }, [product])

  if (!product) {
    return <div className="p-10 text-center text-xl">Product data not available.</div>
  }

  return (
    <>
      <div className="container mx-auto px-10 py-10">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <ProductImageViewer images = {product.images} />

          <div className="w-full max-w-[400px]">
            <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
            <p className="text-gray-600 mt-1">{product.subtitle || product.description?.split('.')[0]}</p>

            {product.rating && (
              <div className="flex items-center gap-2 mt-3">
                <div className="bg-white text-black px-2 py-1 text-sm font-semibold rounded">
                  {product.rating} ★
                </div>
                <span className="text-gray-700 text-sm">| {product.numReviews} Ratings</span>
              </div>
            )}

            <div className="mt-4 flex items-center gap-3 text-xl font-bold">
              ₹{product.price}
            </div>

            <p className="text-gray-600 text-sm mt-1">inclusive of all taxes</p>

            {product.colors?.length > 0 && (
              <div className="mt-6">
                <p className="text-gray-800 font-semibold mb-1">Color:</p>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`px-4 py-2 border rounded-full 
                        ${selectedColor === color ? 'bg-black text-white' : 'bg-white text-black'}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes?.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-4 mb-1">
                  <p className="text-gray-800 font-semibold">Size:</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 border rounded-full 
                        ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
              dispatch(addToCart({
              productId: product._id,   // use _id from MongoDB instead of id
              title: product.title,
              price: product.price,
              image: product.images?.[0]?.url || '',
              size: selectedSize,
             color: selectedColor,
             quantity,
          }));
      }}

              className="mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 w-full"
            >
              Add to Cart
            </button>

            <div className="mt-10">
              <Accordion title="Product Details"
                content={
                  <>
                    {product.material && <p>Material: {product.material}</p>}
                    {product.weight && <p>Weight: {product.weight}</p>}
                    {product.sku && <p>SKU: {product.sku}</p>}
                    {product.tags && <p>Tags: {product.tags.join(', ')}</p>}
                    {product.countInStock && <p>In Stock: {product.countInStock}</p>}
                    {product.isPublished !== undefined && <p>Published: {product.isPublished ? 'Yes' : 'No'}</p>}
                    {product.isFeatured !== undefined && <p>Featured: {product.isFeatured ? 'Yes' : 'No'}</p>}
                  </>
                }
              />
              <Accordion title="Brand"
                content={product.brandDescription || 'This brand offers stylish and premium quality products.'}
              />
              <Accordion title="Size and Fit"
                content={
                  <>
                    <p>• Fit Type: Relaxed fit – designed to be slightly loose for a laid-back silhouette </p>
                    <p>• Length: Standard – hits just below the waist </p>
                    <p>• Sleeves: Dropped shoulder with mid-length sleeves </p>
                    <p>• Model Info: Model is 6&apos;1&quot; (185 cm) and wears size M </p>
                    <p>• Styling Tip: Size up for oversized streetwear, down for sharper fit</p>
                    <button
                      onClick={() => setShowDrawer(true)}
                      className="text-gray-800 underline mt-2 inline-block"
                    >
                      View full size guide
                    </button>
                  </>
                }
              />
              <Accordion title="Look After Me"
                content="Machine wash according to instructions on care label"
              />
              <Accordion title="Delivery and Return Policy"
                content={
                  <>
                    <p>• Standard Shipping: 5–7 business days.</p>
                    <p>• Express Shipping: 2–4 business days.</p>
                    <p>• Free shipping on orders above ₹999.</p>
                    <p>• Returns: 10-day return window. Item must be unused and with tags.</p>
                    <p>• Refunds: Processed within 5–7 days post-inspection.</p>
                    <p>Need help? support@bazarr.com</p>
                  </>
                }
              />
            </div>
          </div>
        </div>
      </div>

      {showDrawer && <SizeGuideDrawer onClose={() => setShowDrawer(false)} />}
    </>
  )
}

export default ProductDetails
