import React, { useContext, useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { getCartItems, cartData, loading, updateCart, deleteCartItem, deleteAllCart, totalPrice } = useContext(CartContext);

  useEffect(() => {
    getCartItems();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
          <DotLoader color="#0AAD0A" size={50} />
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-3">
          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-300 uppercase bg-green-700">
                <tr>
                  <th scope="col" className="px-4 py-3 text-center">Image</th>
                  <th scope="col" className="px-4 py-3 text-center">Product</th>
                  <th scope="col" className="px-4 py-3 text-center">Qty</th>
                  <th scope="col" className="px-4 py-3 text-center">Price</th>
                  <th scope="col" className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((cart, index) => (
                  <tr key={cart._id || index} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-2 text-center">
                      <img
                        src={cart.product.imageCover || "/default-image.png"}
                        className="w-12 md:w-16 lg:w-32 h-auto mx-auto"
                        alt={cart.product.title}
                      />
                    </td>
                    <td className="px-4 py-4 font-semibold text-gray-900 text-center">{cart.product.title}</td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <button
                          disabled={cart.count == 1}
                          onClick={() => updateCart(cart.product._id, cart.count - 1)}
                          className="h-6 w-6 p-1 text-xs sm:text-sm text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="mx-2 px-3 py-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg text-center">
                          {cart.count}
                        </span>
                        <button
                          onClick={() => updateCart(cart.product._id, cart.count + 1)}
                          className="h-6 w-6 p-1 text-xs sm:text-sm text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-semibold text-gray-900 text-center">£E {cart.price * cart.count}</td>
                    <td className="px-4 py-4 text-center">
                      <button
                        className="px-3 py-2 text-xs sm:text-sm font-semibold text-white bg-red-600 rounded-lg shadow-md transition-all duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                        onClick={() => deleteCartItem(cart.product._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Price & Buttons */}
          <div className="flex flex-wrap justify-between items-center px-4 py-4 md:mx-8 lg:mx-10">
            <h2 className="text-lg sm:text-xl font-semibold text-green-600">
              Total Price: <span className="text-black">£E {totalPrice}</span>
            </h2>
            <button
              onClick={() => deleteAllCart()}
              className="flex items-center px-4 py-3 text-xs sm:text-sm font-semibold text-white bg-red-600 rounded-lg shadow-md transition-all duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <i className="fa-solid fa-trash-can mr-2"></i> Clear Cart
            </button>
          </div>

          {/* Checkout Button */}
          <div className="flex justify-center items-center px-4 py-4">
            <button
              onClick={() => navigate("/payment")}
              className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-green-600 rounded-lg shadow-md transition-all duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Check Out
            </button>
          </div>
        </div>
      )}
    </>
  );
}
