import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders, fetchOrderDetails } from "../redux/slices/orderSlice";
import { Loader2, Package, Truck, CheckCircle, XCircle } from "lucide-react";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { orders, orderDetails, loading, error } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleViewDetails = (orderId) => {
    dispatch(fetchOrderDetails(orderId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        My Orders
      </h1>

      {loading && (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin w-8 h-8 text-indigo-600" />
        </div>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Order #{order._id.slice(-6)}
                  </h2>
                  {order.status === "Delivered" ? (
                    <CheckCircle className="text-green-500" />
                  ) : order.status === "Cancelled" ? (
                    <XCircle className="text-red-500" />
                  ) : (
                    <Truck className="text-yellow-500" />
                  )}
                </div>

                <p className="text-sm text-gray-500">
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

                <p className="text-sm text-gray-500">
                  <strong>Total:</strong> ₹{order.totalPrice}
                </p>

                <p className="text-sm text-gray-500">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-medium ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Cancelled"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>

              {/* Product Previews */}
              <div className="space-y-2 mt-4">
                {order.orderItems.slice(0, 2).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 bg-gray-50 p-2 rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
                {order.orderItems.length > 2 && (
                  <p className="text-xs text-gray-400">
                    +{order.orderItems.length - 2} more items
                  </p>
                )}
              </div>

              {/* View Details Button */}
              <button
                onClick={() => handleViewDetails(order._id)}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            You have no orders yet.
          </p>
        )}
      </div>

      {/* Order Details Modal */}
      {orderDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl w-full relative">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Order Details
            </h2>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              {orderDetails.orderItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 border-b pb-3"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.size ? `Size: ${item.size}` : ""}{" "}
                      {item.color ? `Color: ${item.color}` : ""}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 font-medium text-gray-700">
              Total: ₹{orderDetails.totalPrice}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
