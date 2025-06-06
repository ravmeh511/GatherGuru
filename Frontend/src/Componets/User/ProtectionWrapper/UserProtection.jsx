import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function UserProtection({children}) {
     const {isLoggedIn,user}=useSelector((state)=>state.auth);
     if(!isLoggedIn||!user||user.role!="user"){
            return <Navigate to="/" />;
        }
     return children;
}

export default UserProtection
