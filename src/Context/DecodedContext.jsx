import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'



export const DecodedContext = createContext()

export default function DecodedContextProvider({children}) {

    const [decodedToken,setDecodedToken] = useState()
    
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const decoded = jwtDecode(storedToken)
        if (storedToken) {
          setDecodedToken(decoded.id);
        }
      }, []);
    return <>
    
    <DecodedContext.Provider value={{setDecodedToken,decodedToken}}>

        {children}
    </DecodedContext.Provider>
    
    
    </>
}
