import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import PayPalButton from "../Components/Cart/PayPalButton";
import { createCheckout } from "../redux/slices/checkoutSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "India",
    phone: "",
  });

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    try {
      if (cart && cart.products.length > 0) {
        const res = await dispatch(
          createCheckout({
            checkoutItems: cart.products,
            shippingAddress,
            paymentMethod: "Paypal",
            totalPrice:
              cart.products.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              ) || 0,
          })
        );

        if (res.payload && res.payload._id) {
          setCheckoutId(res.payload._id);
        }
      }
    } catch (err) {
      console.error("Checkout creation failed:", err);
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.error("Payment update failed:", error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Finalize checkout failed:", error);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your cart is empty</p>;
  }

  const totalPrice =
    cart?.products?.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ) || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tight">
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={user?.email || "user@example.com"}
              className="w-full p-2 border rounded bg-gray-100"
              disabled
            />
          </div>

          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              disabled
              className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with PayPal</h3>
                <PayPalButton
                  amount={totalPrice.toFixed(2)}
                  onSuccess={handlePaymentSuccess}
                  onError={() => alert("Payment failed. Try again.")}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t pt-4 mb-4 space-y-4">
          {cart?.products?.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-2"
            >
              <div className="flex items-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-20 h-24 object-cover mr-4 rounded"
                />
                <div>
                  <h3 className="text-md font-medium">{product.title}</h3>
                  <p className="text-gray-500 text-sm">Size: {product.size}</p>
                  <p className="text-gray-500 text-sm">Color: {product.color}</p>
                </div>
              </div>
              <p className="text-md font-semibold">
                ₹{product.price?.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-lg mb-2">
          <p>Subtotal</p>
          <p>₹{totalPrice.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg mb-2">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4 font-semibold">
          <p>Total</p>
          <p>₹{totalPrice.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
