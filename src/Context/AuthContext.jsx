import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [token, setToken] = useState(""); // Default to an empty string

    useEffect(() => {
        // Ensure this runs only on the client
        const tokenFromStorage = typeof window !== "undefined" ? localStorage.getItem("token") : "";
        if (tokenFromStorage) {
            setToken(tokenFromStorage);
        }
    }, []);

    const logout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
        }
        setToken("");
    };

    return (
        <AuthContext.Provider value={{ token, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
