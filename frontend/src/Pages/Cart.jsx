import React from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../redux/slices/cartSlice"
import { Link } from 'react-router-dom';

export default function CartPage() {
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => state.cart); 
  const cartItems = cart?.products || []; 

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-16 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <ShoppingCart className="w-7 h-7" /> Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={`${item.productId}-${item.size}-${item.color}`}
                className="flex flex-col md:flex-row items-center gap-6 bg-white p-4 rounded-xl shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-28 h-28 object-cover rounded-lg"
                />
                <div className="flex-1 space-y-1">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-sm text-gray-600">Color: {item.color}</p>
                  <p className="text-sm font-medium text-black">
                    ${ (item.price || 0).toFixed(2) }
                  </p>

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() =>
                        item.quantity > 1 &&
                        dispatch(updateCartItemQuantity({
                          productId: item.productId,
                          size: item.size,
                          color: item.color,
                          quantity: item.quantity - 1,
                          userId: user?._id || null, 
                          guestId: !user ? localStorage.getItem("guestId") : null
                        }))
                      }
                      className="bg-gray-200 w-7 h-7 rounded-full text-lg font-bold"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(updateCartItemQuantity({
                          productId: item.productId,
                          size: item.size,
                          color: item.color,
                          quantity: item.quantity + 1,
                          userId: user?._id || null,
                          guestId: !user ? localStorage.getItem("guestId") : null
                        }))
                      }
                      className="bg-gray-200 w-7 h-7 rounded-full text-lg font-bold"
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        dispatch(removeFromCart({
                          productId: item.productId,
                          size: item.size,
                          color: item.color,
                          userId: user?._id || null,
                          guestId: !user ? localStorage.getItem("guestId") : null
                        }))
                      }
                      className="ml-4 text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-right">
              <h3 className="text-xl font-semibold">
                Total: <span className="text-black">₹{total}</span>
              </h3>
              <Link to='/checkout'>
                <button className="mt-4 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900 transition">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
