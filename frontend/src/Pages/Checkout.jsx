import React, { useState } from 'react';
import { useCart } from '../Components/Cart/CartContext';

export default function CheckoutPage() {
  const { cartItems } = useCart();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    address: '',
    city: '',
    county: '',
    postcode: '',
    country: 'India',
    paymentMethod: 'cod',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed successfully with ${form.paymentMethod.toUpperCase()}!`);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-16 py-10 font-sans">
      <h1 className="text-3xl font-bold text-center mb-10 tracking-wide">CHECKOUT</h1>

      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        
        <form
          onSubmit={handleSubmit}
          className="md:col-span-2 bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="For delivery updates"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">County (Optional)</label>
              <input
                type="text"
                name="county"
                value={form.county}
                onChange={handleChange}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Postcode</label>
              <input
                type="text"
                name="postcode"
                value={form.postcode}
                onChange={handleChange}
                required
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                name="country"
                value="India"
                disabled
                className="w-full bg-gray-100 border rounded-md p-2 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Select Payment Method</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={form.paymentMethod === 'cod'}
                  onChange={handleChange}
                  className="accent-black"
                />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={form.paymentMethod === 'upi'}
                  onChange={handleChange}
                  className="accent-black"
                />
                <span>UPI</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 font-semibold rounded-md hover:bg-gray-900 transition"
          >
            Proceed to Payment
          </button>
        </form>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {cartItems.length} {cartItems.length === 1 ? 'ITEM' : 'ITEMS'}
          </h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.ID} className="flex items-center space-x-4 mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="text-sm">
                    <p className='font-medium text-base'>{item.title}</p>
                    <p className="font-medium">₹{item.price}</p>
                    <p className="text-gray-500 mt-1">
                      Size: {item.size || 'Free'} | Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}

              <div className="border-t mt-6 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total to Pay</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

