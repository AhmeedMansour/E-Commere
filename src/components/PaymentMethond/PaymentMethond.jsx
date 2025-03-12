import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function PaymentMethod() {
  const { cartId, setNumCartItems, totalPrice, cartData } = useContext(CartContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");

  async function cashOrder(values) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        values,
        { headers: { token: localStorage.getItem("token") } }
      );
      if (data.status === "success") {
        toast.success("Order placed successfully!", { autoClose: 3000 });
        setNumCartItems(0);
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      console.log(err, "Cash ERROR!!");
      toast.error("Cart is Empty!");
    }
  }

  async function visaOrder(values) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,
        values,
        { headers: { token: localStorage.getItem("token") } }
      );
      window.open(data.session.url, "_blank");
      if (data.status === "success") {
        toast.success("Order placed successfully!", { autoClose: 3000 });
      }
    } catch (err) {
      console.log(err, "Visa ERROR!!");
      toast.error("Cart is Empty!");
    }
  }

  async function handleOrder(values) {
    console.log("Form Data:", values);
    if (paymentMethod === "cash") {
      cashOrder(values);
    } else if (paymentMethod === "visa") {
      visaOrder(values);
    }
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: handleOrder,
  });

  return (
    <div className="container mx-auto p-6 grid md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 w-full">
        <h2 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4">Order Summary</h2>
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Total Price: <span className="text-green-600">£E <span className="text-black dark:text-white">{totalPrice}</span></span>
        </p>
        <div className="mt-4 max-h-[300px] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-500 dark:scrollbar-thumb-gray-700">
          {cartData.map((cart) => (
            <div key={cart.product._id} className="flex items-center space-x-4 border-b pb-3">
              <img className="w-16 h-16 object-cover rounded-lg" src={cart.product.imageCover} alt={cart.product.title} />
              <div>
                <h3 className="text-gray-800 dark:text-white font-medium">
                  {cart.product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">£E{cart.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 text-center mb-6">Complete Your Order</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <input type="text" name="shippingAddress.details" id="details" onChange={formik.handleChange} value={formik.values.shippingAddress.details} className="w-full px-4 py-3 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500" placeholder="Address Details" required />
          <input type="tel" name="shippingAddress.phone" id="phone" onChange={formik.handleChange} value={formik.values.shippingAddress.phone} className="w-full px-4 py-3 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500" placeholder="Phone Number" required />
          <input type="text" name="shippingAddress.city" id="city" onChange={formik.handleChange} value={formik.values.shippingAddress.city} className="w-full px-4 py-3 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500" placeholder="City" required />
          <div className="flex flex-col gap-3">
            <button type="button" onClick={() => { setPaymentMethod("cash"); formik.handleSubmit(); }} className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-all">Cash on Delivery</button>
            <button type="button" onClick={() => { setPaymentMethod("visa"); formik.handleSubmit(); }} className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all">Pay with Visa</button>
          </div>
        </form>
      </div>
    </div>
  );
}