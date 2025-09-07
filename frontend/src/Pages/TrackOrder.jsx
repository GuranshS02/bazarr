import React from 'react'

const TrackOrder = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-center">
  <h1 className="text-3xl font-bold mb-6">Track Your Order</h1>
  <p className="mb-6 text-gray-600">Enter your Order ID and Email to track your shipment.</p>
  <input
    type="text"
    placeholder="Order ID"
    className="border rounded-lg px-4 py-2 mr-2"
  />
  <input
    type="email"
    placeholder="Email Address"
    className="border rounded-lg px-4 py-2 mr-2"
  />
  <button className="bg-black text-white px-4 py-2 rounded-lg">Track Order</button>
</div>

  )
}

export default TrackOrder