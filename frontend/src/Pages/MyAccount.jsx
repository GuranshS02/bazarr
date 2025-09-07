import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { LogOut, Package, MapPin, User } from "lucide-react"
import { logoutUser } from "../redux/slices/authSlice"
import { useNavigate } from "react-router-dom"

// Mock Components for Right Content
const Orders = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">My Orders</h2>
    <p className="text-gray-600">Here you can view and track your past and current orders.</p>
  </div>
)

const Addresses = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">My Addresses</h2>
    <p className="text-gray-600">Manage your saved addresses for faster checkout.</p>
  </div>
)

const Profile = ({ user }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Personal Info</h2>
    <p className="text-gray-600">Name: {user.firstName} {user.lastName}</p>
    <p className="text-gray-600">Email: {user.email}</p>
  </div>
)

const MyAccount = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("orders")

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate("/login")
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-gray-600">
        <p className="text-lg">You are not logged in</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Go to Login
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
      {/* Sidebar */}
      <div className="col-span-1 border-r border-gray-200 pr-6">
        <h1 className="text-2xl font-light tracking-wide text-gray-900 mb-6 uppercase">
          My Account
        </h1>
        <p className="text-sm text-gray-500 mb-10">
          Welcome back, <span className="font-medium text-black">{user.firstName}</span>
        </p>

        <nav className="flex flex-col gap-5 text-gray-700">
          <button
            className={`flex items-center gap-2 text-sm uppercase tracking-wide ${
              activeTab === "orders" ? "font-semibold text-black" : "hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            <Package size={18} /> My Orders
          </button>
          <button
            className={`flex items-center gap-2 text-sm uppercase tracking-wide ${
              activeTab === "addresses" ? "font-semibold text-black" : "hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("addresses")}
          >
            <MapPin size={18} /> My Addresses
          </button>
          <button
            className={`flex items-center gap-2 text-sm uppercase tracking-wide ${
              activeTab === "profile" ? "font-semibold text-black" : "hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={18} /> Personal Info
          </button>
        </nav>

        {/* Logout */}
        <div className="mt-12">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs uppercase tracking-wide border border-black text-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Right Content Area */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="col-span-2"
      >
        {activeTab === "orders" && <Orders />}
        {activeTab === "addresses" && <Addresses />}
        {activeTab === "profile" && <Profile user={user} />}
      </motion.div>
    </div>
  )
}

export default MyAccount
