import { Routes, Route } from "react-router-dom";
import React from "react";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./Componets/AdminDashboard";
import AdminProtectWrapper from "./Componets/ProtectionWrapper/AdminProtectWrapper";
import AdminProfile from "./Componets/AdminProfile";
import AdminUserList from "./Componets/AdminUserList";
import UserSignup from "./Componets/User/UserSignup";
import { UserDashboard } from "./Componets/User/UserDashboard";
import UserProtection from "./Componets/User/ProtectionWrapper/UserProtection";
import UserLogin from "./Componets/User/UserLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLogin/>} />
      <Route path="/user/signup" element={<UserSignup/>}/>
      <Route
        path="/user/dashboard"
        element={
          <UserProtection>
            <UserDashboard />
          </UserProtection>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectWrapper>
            <AdminDashboard />
          </AdminProtectWrapper>
        }
      />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/profile"
        element={
          <AdminProtectWrapper>
            <AdminProfile />
          </AdminProtectWrapper>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminProtectWrapper>
            <AdminUserList />
          </AdminProtectWrapper>
        }
      />
    </Routes>
  );
}

export default App;
