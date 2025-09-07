import React from 'react'

const Cancellation = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
  <h1 className="text-3xl font-bold mb-6">Cancellation Policy</h1>
  <p className="mb-4 text-gray-600">Orders can be cancelled within 24 hours of purchase.</p>
  <ul className="list-disc list-inside space-y-2 text-gray-600">
    <li>No cancellation allowed once the order is shipped.</li>
    <li>Refunds will be processed within 5–7 business days.</li>
    <li>To cancel, contact support@bazarr.com with your Order ID.</li>
  </ul>
</div>

  )
}

export default Cancellation