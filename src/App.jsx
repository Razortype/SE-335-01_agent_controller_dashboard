import { useState } from 'react'
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./views/Login";
import { ToastContainer } from "react-toastify";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layouts/MainLayout/MainLayout";
import PersistLogin from "./components/AuthComponents/PersistLogin/PersistLogin";
import RequireAuth from "./components/AuthComponents/RequireAuth/RequireAuth";
import Dashboard from './views/Dashboard';
import Agents from './views/Agents';
function App() {

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/login");
    }
  }, []);

  return (
    <>
      
      <div className="custom-scrollbar overflow-auto">

        <Routes>
        
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
        
          <Route element={<PersistLogin />}>
            <Route element={<MainLayout />}>
              <Route element={<RequireAuth allowedRoles={["MANAGER", "ADMIN"]} />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={["MANAGER", "ADMIN"]} />}>
                <Route path="/agents" element={<Agents />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={["MANAGER", "ADMIN"]} />}>
                <Route path="/agent/:id" element={<Agents />} />
              </Route>
            </Route>
          </Route>
        
        </Routes>

        <ToastContainer toastStyle={{
          backgroundColor: "#421582",
          color:"white"
        }} />

      </div>

    </>
  )
}

export default App
