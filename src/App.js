import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/secure/Dashboard";
import Home from "./pages/home/Home";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'sonner';
import ExpenseList from "./pages/secure/ExpenseList";
import VerifyMail from "./pages/home/VerifyMail";
function App() {
  return (
    <GoogleOAuthProvider clientId="633999849028-1foijqvg6e3g71ltuv2feepkb530tjvo.apps.googleusercontent.com">
       <Toaster position="top-center" theme="dark"  />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details" element={<ExpenseList />} />
        <Route path="/users/:id/verify/:token" element={<VerifyMail />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
