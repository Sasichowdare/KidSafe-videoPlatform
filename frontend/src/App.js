import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Login} from "./pages/login";
import { Home } from "./pages/home";
import {Register} from './pages/register';
import  Profile  from "./pages/profile";
import  Forgotpassword  from "./pages/ForgotPassword";
import  Resetpassword  from "./pages/restPassword";
import Feed from "./pages/feed.js";
import React from "react";
import "./App.css"; // Import your CSS file here
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/reset-password/:token" element={<Resetpassword />} /> {/* Handles token */}
        <Route path="/feed" element={<Feed />} />

      </Routes>
    </Router>
  );
}

export default App;
