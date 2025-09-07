import React from 'react'

const Shipping = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
  <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>
  <p className="mb-4 text-gray-600">We aim to deliver your orders as quickly as possible.</p>
  <ul className="list-disc list-inside space-y-2 text-gray-600">
    <li>Standard shipping: 5–7 business days</li>
    <li>Express shipping: 2–3 business days</li>
    <li>International shipping: 7–14 business days</li>
  </ul>
  <p className="mt-4 text-gray-600">Tracking details will be emailed once your order is shipped.</p>
</div>

  )
}

export default Shipping