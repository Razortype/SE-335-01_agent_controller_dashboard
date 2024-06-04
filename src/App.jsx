import { useState } from 'react'
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./views/Login";
import { ToastContainer } from "react-toastify";
import Register from "./views/Register";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Home from "./views/Home";
import MainLayout from "./layouts/MainLayout/MainLayout";
import PersistLogin from "./components/AuthComponents/PersistLogin/PersistLogin";
import RequireAuth from "./components/AuthComponents/RequireAuth/RequireAuth";
import Create from "./views/Create";
import NoteDetails from "./views/NoteDetails";

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
          <Route path="/login" element={<Login />} />
        </Routes>

        <Routes element={<PersistLogin />}>
          <Route element={<MainLayout />}>
            <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
              
            </Route>
          </Route>
        </Routes>

      </div>

    </>
  )
}

export default App
