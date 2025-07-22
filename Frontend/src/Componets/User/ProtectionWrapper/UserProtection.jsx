import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function UserProtection({children}) {
     const {isAuthenticated, user} = useSelector((state) => state.auth);
     if(!isAuthenticated || !user || user.role !== "user"){
            return <Navigate to="/" />;
     }
     return children;
}

export default UserProtection
