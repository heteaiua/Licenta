import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/login/Login";
import "./App.css";
import Home from "./pages/home/Home";
import SignUp from "./auth/signup/SignUp";
import Dashboard from "./pages/dashboard/Dashboard";
import Navbar from "./components/Navbar";
import Appliances from "./pages/appliances/Appliances";
import ContactUs from "./pages/contactUs/ContactUs";
import { ModalProvider } from "./components/Modal";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Home" element={<Dashboard />} />
        <Route path="/Appliances" element={<Appliances />} />
        <Route path="/ContactUs" element={<ContactUs />} />
      </Routes>
    </>
  );
}
export default App;
