import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Package, Truck } from "lucide-react";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  // Auto redirect after a delay (optional)
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 8000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-10 text-center relative"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <CheckCircle2 className="text-green-500 w-20 h-20" />
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Order Confirmed
        </h1>
        <p className="text-gray-500 mb-6">
          Thank you for shopping with us. Your payment has been received and
          your order is now being processed.
        </p>

        {/* Order Status Steps */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center"
          >
            <Package className="w-12 h-12 text-gray-600 mb-2" />
            <p className="text-sm font-medium">Order Placed</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center"
          >
            <Truck className="w-12 h-12 text-gray-600 mb-2" />
            <p className="text-sm font-medium">Shipped Soon</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center"
          >
            <CheckCircle2 className="w-12 h-12 text-gray-600 mb-2" />
            <p className="text-sm font-medium">Delivered</p>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate("/orders")}
            className="bg-black text-white px-6 py-3 rounded-xl shadow hover:bg-gray-800 transition"
          >
            View Orders
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl shadow hover:bg-gray-300 transition"
          >
            Continue Shopping
          </button>
        </div>

        {/* Auto redirect message */}
        <p className="text-sm text-gray-400 mt-6">
          You will be redirected to homepage in a few seconds...
        </p>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
