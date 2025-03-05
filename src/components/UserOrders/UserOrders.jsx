import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DecodedContext } from "../../Context/DecodedContext";

export default function UserOrders() {
    const { id } = useParams(); // ✅ Get Order ID from URL
    const { decodedToken } = useContext(DecodedContext); // ✅ Get logged-in user ID
    const [order, setOrder] = useState(null);

    useEffect(() => {
        async function fetchUserOrders() {
            try {
                const { data } = await axios.get(
                    `https://ecommerce.routemisr.com/api/v1/orders/user/${decodedToken}`
                );
                const selectedOrder = data.find(order => order.id.toString() === id);
                setOrder(selectedOrder);
            } catch (error) {
                console.error("Error fetching order:", error);
            }
        }
        fetchUserOrders();
    }, [id, decodedToken]);

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Order Details</h1>

            {order ? (
                <>
                    <div className="mb-6">
                        <p className="dark:text-white font-semibold" ><strong >Order ID :</strong> {order.id}</p>
                        <p className="dark:text-white font-semibold" ><strong >Total Price :</strong> £E {order.totalOrderPrice}</p>
                        <p className="dark:text-white font-semibold" ><strong >Status :</strong> {order.isDelivered ? "✅ Delivered" : "⏳ Pending"}</p>
                    </div>

                    {/* Order Items Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse shadow-md rounded-lg">
                            <thead>
                                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white">
                                    <th className="p-3 text-left">#</th>
                                    <th className="p-3 text-left">Image</th>
                                    <th className="p-3 text-left">Product</th>
                                    <th className="p-3 text-left">Quantity</th>
                                    <th className="p-3 text-left">Price</th>
                                </tr>
                            </thead>

                            <tbody>
                                {order.cartItems.map((item, index) => (
                                    <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"} border-b dark:border-gray-700`}>
                                        <td className="p-3 dark:text-white">{index + 1}</td>
                                        <td className="p-3">
                                            <img className="w-16 h-16 object-cover rounded-md" src={item.product.imageCover} alt="Product" />
                                        </td>
                                        <td className="p-3  dark:text-white ">{item.product.title.split(" ").slice(0,2).join(" ")}</td>
                                        <td className="p-3   dark:text-white">{item.count}</td>
                                        <td className="p-3  dark:text-white  font-medium">£E {item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <p className="text-red-500 font-semibold">No order found with this ID.</p>
            )}
        </div>
    );
}
