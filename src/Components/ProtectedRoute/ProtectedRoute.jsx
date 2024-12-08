import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'

const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute 