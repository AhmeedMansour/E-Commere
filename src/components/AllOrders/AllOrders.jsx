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
        <div className="min-h-screen bg-transparent p-4 sm:p-6 pb-16">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    Your Orders
                </h1>

                {/* Table Wrapper for Responsiveness */}
                <div className="overflow-x-auto">
                    <table className="w-full table-fixed border-collapse rounded-lg overflow-hidden shadow-sm">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white">
                                <th className="p-3 text-center w-[15%]">#</th>
                                <th className="p-3 text-center w-[35%]">Order Price</th>
                                <th className="p-3 text-center w-[25%]">Status</th>
                                <th className="p-3 text-center w-[25%]">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orderData?.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`border-b dark:border-gray-700 ${
                                        index % 2 === 0
                                            ? "bg-gray-50 dark:bg-gray-800"
                                            : "bg-white dark:bg-gray-900"
                                    }`}
                                >
                                    <td className="p-3 text-center text-gray-900 dark:text-white text-sm sm:text-base">
                                        {item.id}
                                    </td>
                                    <td className="p-3 text-center text-sm sm:text-lg font-medium text-gray-800 dark:text-gray-200">
                                        £E {item.totalOrderPrice}
                                    </td>
                                    <td className="p-3 text-center text-sm sm:text-base text-gray-700 dark:text-gray-300 truncate max-w-[100px]">
                                        {item.isDelivered? "Delivered" : "Pending..."}
                                    </td>
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() =>
                                                navigate(`/order-details/${item.id}`)
                                            }
                                            className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg px-4 py-2 text-xs sm:text-sm transition-all duration-300 shadow-md max-w-[100px] whitespace-nowrap"
                                        >
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
