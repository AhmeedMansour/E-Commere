import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || ""); // Ensure it's always a string

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('token');

        if (tokenFromStorage) {
            setToken(tokenFromStorage);
        } else {
            localStorage.removeItem('token');
            setToken(""); // Ensure token is always a string
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setToken("");
    };

    return (
        <AuthContext.Provider value={{ token, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
