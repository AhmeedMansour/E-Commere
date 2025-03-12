import { createContext, useState } from "react";

export const OrderData = createContext();

export function OrderDataProvider({ children }) {
    const [orderData, setOrderData] = useState([]);

    return (
        <OrderData.Provider value={{ orderData, setOrderData }}>
            {children}
        </OrderData.Provider>
    );
}
