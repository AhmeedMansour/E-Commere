import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DecodedContext } from "../../Context/DecodedContext";
import { OrderData } from "../../Context/OrderDataContext";

export default function UserOrders() {
  const { id } = useParams();
  const { decodedToken } = useContext(DecodedContext);
  const { orderData } = useContext(OrderData);
  const [order, setOrder] = useState(null);


  useEffect(() => {
    async function fetchUserOrders() {
      try {
        if (!decodedToken) {
          console.error("User token is missing!");
          return;
        }

        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${decodedToken}`
        );

        console.log("Full API Response:", data);

        if (!data || !Array.isArray(data)) {
          console.error("Invalid data format: Expected an array");
          return;
        }

        const selectedOrder = data.find(
            (order) => order.id?.toString() === id || order._id?.toString() === id
          );
          

        if (!selectedOrder) {
          console.warn("Order not found with ID:", id);
          return;
        }

        setOrder(selectedOrder);
        console.log("Selected Order:", selectedOrder);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchUserOrders();

  }, [id, decodedToken]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      {order ? (
        <div className="space-y-6">
          {/* Order, Customer, and Address Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="dark:text-white">
              <h3 className="text-lg font-bold mb-2">
                Order Details <i className="fa-solid fa-truck-fast"></i>
              </h3>
              <p>
                <strong>ID:</strong> {order.id}
              </p>
              <p>
                <strong>Total:</strong> £E {order.totalOrderPrice}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {order.isDelivered ? "✅ Delivered" : "⏳ Pending"}
              </p>
            </div>
            <div className="dark:text-white">
              <h3 className="text-lg font-bold mb-2">
                Address Info <i className="fa-solid fa-map-location-dot"></i>
              </h3>
              <p>
                <strong>City:</strong>{" "}
                {order.shippingAddress?.city || "Not available"}
              </p>
              <p>
                <strong>Street:</strong>{" "}
                {order.shippingAddress?.details || "Not available"}
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                {order.shippingAddress?.phone || "Not available"}
              </p>
            </div>
            <div className="dark:text-white">
              <h3 className="text-lg font-bold mb-2">
                Customer Info <i className="fa-solid fa-address-card"></i>
              </h3>
              <p>
                <strong>Name:</strong> {order.user?.name || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {order.user?.email || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {order.user?.phone || "N/A"}
              </p>
            </div>
          </div>

          {/* Order Items Table */}
          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse shadow-md rounded-lg">
              <thead className="bg-gray-200 dark:bg-gray-700 dark:text-white">
                <tr>
                  <th className="p-3 text-left dark:text-white">#</th>
                  <th className="p-3 text-left dark:text-white">Image</th>
                  <th className="p-3 text-left dark:text-white">Product</th>
                  <th className="p-3 text-left dark:text-white">Quantity</th>
                  <th className="p-3 text-left dark:text-white">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0
                        ? "bg-gray-50 dark:bg-gray-800"
                        : "bg-white dark:bg-gray-900"
                    } border-b dark:border-gray-700`}
                  >
                    <td className="p-3 dark:text-white">{index + 1}</td>
                    <td className="p-3">
                      <img
                        className="w-16 h-16 object-cover rounded-md"
                        src={item.product?.imageCover || ""}
                        alt="Product"
                      />
                    </td>
                    <td className="p-3 dark:text-white">
                      {item.product?.title.split(" ").slice(0, 2).join(" ") ||
                        "N/A"}
                    </td>
                    <td className="p-3 dark:text-white">{item.count}</td>
                    <td className="p-3 dark:text-white font-medium">
                      £E {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-red-500 font-semibold">No order found with this ID.</p>
      )}
    </div>
  );
}
