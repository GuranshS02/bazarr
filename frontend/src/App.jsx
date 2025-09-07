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
import {Provider, useDispatch, useSelector} from 'react-redux'
import store from './redux/store'
import OrdersPage from './Pages/Orders';
import OrderConfirmation from './Pages/OrderConfirmation';
import MyAccount from './Pages/MyAccount';
import ContactUs from './Pages/ContactUs';
import FAQ from './Pages/FAQ';
import TAC from './Pages/TAC';
import TrackOrder from './Pages/TrackOrder';
import Shipping from './Pages/Shipping';
import Cancellation from './Pages/Cancellation';
import Returns from './Pages/Returns';

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
      <Route path='/orders' element={<OrdersPage />} />
      <Route path='/order-confirmation' element={<OrderConfirmation />} />
      <Route path='/my-account' element={<MyAccount />} />
      <Route path='/contact-us' element={<ContactUs />} />
      <Route path='/faq' element={<FAQ />} />
      <Route path='/t&c' element={<TAC />} />
      <Route path='/track-orders' element={<TrackOrder />} />
      <Route path='/shipping' element={<Shipping />} />
      <Route path='/cancellations' element={<Cancellation />} />
      <Route path='/returns' element={<Returns />} />

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