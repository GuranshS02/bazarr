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
import AdminLayout from './Components/Admin/AdminLayout'
import AdminHomePage from './Pages/AdminHomePage'
import UserManagement from './Components/Admin/UserManagement'
import ProductManagement from './Components/Admin/ProductManagement'
import EditProductPage from './Components/Admin/EditProductPage';
import {Provider} from 'react-redux'
import store from './redux/store'

export const App = () => {
  return (
    <>
    <Provider store={store}>
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
      <Route path='/admin' element={<AdminLayout />}>
      <Route index element={<AdminHomePage />} />
      <Route path='users' element={<UserManagement />} />
      <Route path='products' element={<ProductManagement />} />
      <Route path='products/:id/edit' element={<EditProductPage/>} />
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}
export default App;