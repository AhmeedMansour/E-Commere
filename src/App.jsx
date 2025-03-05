import React from 'react'
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Products from './components/Products/Products'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Error from './components/Error/Error'
import AuthContextProvider from './Context/AuthContext'
import Guard from './components/Guard/Guard'
import AuthGuard from './components/AuthGuard/AuthGuard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CartContextProvider, { CartContext } from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import WishlistContextProvider from './Context/WishlistContext'
import Wishlist from './components/Wishlist/Wishlist'
import BrandsDetails from './components/BrandsDetails/BrandsDetails'
import AllOrders from './components/AllOrders/AllOrders'
import PaymentMethond from './components/PaymentMethond/PaymentMethond'
import DecodedContextProvider from './Context/DecodedContext';
import UserOrders from './components/UserOrders/UserOrders';
const queryClient = new QueryClient()
const App = () => {

  const routes = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <Guard><Home /></Guard> },
        { path: 'cart', element: <Guard><Cart /></Guard> },
        { path: 'allorders', element: <Guard><AllOrders /></Guard> },
        { path: 'payment', element: <Guard><PaymentMethond /></Guard> },
        { path: 'products', element: <Guard> <Products /></Guard> },
        { path: 'orders', element: <Guard> <AllOrders /></Guard> },
        { path: 'orders/:id', element: <Guard> <UserOrders /></Guard> },
        { path: 'categories', element: <Guard><Categories /></Guard> },
        { path: 'wishlist', element: <Guard><Wishlist /></Guard> },
        { path: 'brandsdetails/:id', element: <Guard><BrandsDetails /></Guard> },
        { path: 'brands', element: <Guard><Brands /></Guard> },
        { path: 'details/:id', element: <Guard><ProductDetails /></Guard> },
        { path: 'login', element: <AuthGuard><Login /></AuthGuard> },
        { path: 'register', element: <AuthGuard><Register /></AuthGuard> },
        { path: '*', element: <Error /> },

      ]
    }
  ])
  return (
    <>
      <AuthContextProvider>
        <WishlistContextProvider>
          <CartContextProvider>
            <DecodedContextProvider>
              <QueryClientProvider client={queryClient}>
                <RouterProvider router={routes} />
                <Toaster />
              </QueryClientProvider>
            </DecodedContextProvider>
          </CartContextProvider>
        </WishlistContextProvider>
      </AuthContextProvider>

    </>
  )
}

export default App
