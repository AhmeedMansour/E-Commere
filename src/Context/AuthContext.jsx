import React, { createContext, useContext, useEffect, useState } from 'react'


 export const AuthContext = createContext();
export default function AuthContextProvider({children}) {
    const [token, setToken] = useState(null)

    useEffect(()=>{
        const tokenFromStorage = localStorage.getItem('token')
        if(tokenFromStorage){
            setToken(tokenFromStorage)
        }
        else{
            localStorage.removeItem('token')
            setToken(null)
        }
     } ,[])


     const logout = ()=> {
        localStorage.removeItem('token');
    setToken(null);
     }
  return <>
  
 <AuthContext.Provider value={{token , setToken,logout}}>
{children} 

 </AuthContext.Provider>



  </>
}
