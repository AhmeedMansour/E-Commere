
import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Link } from 'react-router-dom'

export default function Guard({children}) {
    const {token} = useContext(AuthContext)
  return (
    <div>
     { token? children : <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">
          Access Denied!
        </h2>
        <p className="text-gray-600 mb-6">
          You must be logged in to view this page.
        </p>
        <Link
          to="/login"
          className="bg-green-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-green-700 transition duration-200"
        >
          Go to Login
        </Link>
      </div>
    </div> }
    </div>
  )
}
