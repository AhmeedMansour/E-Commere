
import React, { useEffect, useState, useContext } from "react";
import { DecodedContext } from "../../Context/DecodedContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AllOrders() {
    const { decodedToken } = useContext(DecodedContext);
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState([]);

    async function displayAllOrders() {
        console.log(decodedToken, "TOKEN");

        try {
            const { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/orders/user/${decodedToken}`
            );
            console.log(data);
            setOrderData(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        displayAllOrders();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    Your Orders
                </h1>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
                        {/* Table Head */}
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white">
                                <th className="p-3 w-1/3 text-center">#</th>
                                <th className="p-3 w-1/3 text-center border-l dark:border-gray-600">
                                    Order Price
                                </th>
                                <th className="p-3 w-1/3 text-center border-l dark:border-gray-600">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {orderData?.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`border-b dark:border-gray-700 ${index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"
                                        }`}
                                >
                                    <td className="p-3 text-center text-gray-900 dark:text-white">{item.id}</td>
                                    <td className="p-3 text-center text-lg font-medium text-gray-800 dark:text-gray-200">
                                        £E {item.totalOrderPrice}
                                    </td>
                                    <td className="p-3 text-center">
                                        <button
                                          onClick={()=>navigate(`/orders/${item.id}`)}
                                        className="bg-green-500 hover:bg-green-600 cursor-pointer text-white font-semibold rounded-lg px-4 py-2 transition-all duration-300 shadow-md">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
