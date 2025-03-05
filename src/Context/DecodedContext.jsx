import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

export const DecodedContext = createContext();

export default function DecodedContextProvider({ children }) {
    const [decodedToken, setDecodedToken] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken);
                    setDecodedToken(decoded.id);
                } catch (error) {
                    console.error("Invalid token:", error);
                    setDecodedToken(null);
                }
            }
        }
    }, []);

    return (
        <DecodedContext.Provider value={{ setDecodedToken, decodedToken }}>
            {children}
        </DecodedContext.Provider>
    );
}
