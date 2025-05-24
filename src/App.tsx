import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AddEntry from "./components/AddEntry";
import { isLoggedIn } from "./auth/auth";

const App: React.FC = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn() ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={isLoggedIn() ? <AddEntry /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
);

export default App;
