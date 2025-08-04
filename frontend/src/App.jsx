import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import UserLayout from './Components/Layout/UserLayout';
import Home from './Pages/home' 
import ProductDetails from './Components/Product/ProductDetails';
import FeaturedProducts from './Components/Product/FeaturedProducts';
import SizeGuide from './Components/Product/SizeGuide';
import Men from './Pages/Men';
import Women from './Pages/Women';
import Login from './Pages/Login';
import SignupDetails from './Pages/SignUp';
import Collection from './Pages/collection';
import CartPage from './Pages/Cart';
import CheckoutPage from './Pages/Checkout';


export const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserLayout />}>
      <Route index element={<Home />} />
      <Route path="/product/:productName" element={<ProductDetails />} />
      <Route path="/featured-products" element={<FeaturedProducts />} />
      <Route path='/size-guide' element={<SizeGuide />} />
      <Route path='/men' element={<Men />} />
      <Route path='/women' element={<Women />} />
      <Route path='/collection' element={<Collection />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/checkout' element={<CheckoutPage />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup-details' element={<SignupDetails />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App;