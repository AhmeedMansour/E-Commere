import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DotLoader } from "react-spinners";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Cart() {

  const { getCartItems,cartData,loading,updateCart,deleteCartItem,deleteAllCart,totalPrice } = useContext(CartContext)



  useEffect(() => {
    getCartItems()
  }, [])

   const navigate = useNavigate()

  return (<>

    { loading? (<div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50"><DotLoader color="#0AAD0A" size={50} /></div>):(
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-3">
      <table className="w-full text-sm text-left rtl:text-right my-3 text-gray-500">
        <thead className="text-xs text-gray-300 uppercase bg-green-700">
          <tr>
            <th scope="col" className="px-16 py-3">
      
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">Product</th>
            <th scope="col" className="px-6 py-3">Qty</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartData.map((cart, index) => (
                <tr
                  key={cart._id || index}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-4">
                    <img
                      src={cart.product.imageCover || "/default-image.png"}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={cart.product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {cart.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button disabled={cart.count==1} onClick={()=>updateCart(cart.product._id,cart.count-1)}
                        className="inline-flex cursor-pointer items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                        type="button"
                      >
                        -
                      </button>
                    
                      <span className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg text-center">{cart.count}</span>
                      <button
                      onClick={()=>{updateCart(cart.product._id,cart.count+1)}}
                        className="inline-flex cursor-pointer items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                  £E {cart.price * cart.count}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg shadow-md transition-all duration-300 hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                      onClick={() => deleteCartItem(cart.product._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      <div className="flex justify-between px-6 py-4">
        <h2 className="ms-[70px] text-xl font-semibold text-green-600">Total Price : <span className="text-black">{totalPrice}</span></h2>
        
    <button
    onClick={()=>deleteAllCart()}
      className="flex items-center px-4 py-3 me-[70px] text-sm font-semibold text-white bg-red-600 cursor-pointer rounded-lg shadow-md transition-all duration-300 hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
    >
      <i className="fa-solid fa-trash-can mr-2"></i> Clear Cart
    </button>
  </div>
  <div  className="flex justify-center items-center px-6 py-4">
    <button onClick={()=>navigate('/payment')}  className="flex items-center px-5 py-3 me-[70px] text-sm font-semibold text-white bg-green-600 cursor-pointer rounded-lg shadow-md transition-all duration-300 hover:bg-green-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">Check Out</button>



    
  </div>
    </div>) }
      </>);
  
}
