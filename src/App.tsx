import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthComponent from "./components/Auth/AuthComponent"; // Path to AuthComponent

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-left" />
      {/* Define the Routes for SignIn and SignUp */}
      <Routes>
        {/* For SignIn */}
        <Route path="/" element={<AuthComponent mode="signin" />} />
        {/* For SignUp */}
        <Route path="/signup" element={<AuthComponent mode="signup" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
