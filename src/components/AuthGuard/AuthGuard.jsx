import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function AuthGuard({ children }) {
    const { token } = useContext(AuthContext)
    return <>
    
        {token? <Navigate to={"/"}/>:children}

    </>
}
