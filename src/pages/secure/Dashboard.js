import React, { useEffect, useState } from "react";
import "../css/dashboard.css";
import AddExpense from "../../components/AddExpense";
import { doLogout, getCurrentUser, isLoggedIn } from "../../auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";


const Dashboard = () => {
  const [username,setUsername]=useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    setUsername(getCurrentUser())
    if (!isLoggedIn()) {
      navigate('/login');
    }
  },[navigate])
  const logout = () => {
    doLogout(() => {
      navigate('/login');
    });
  }

  return (
    <div className="dashboard">
    <div className="main_usernav">
    <h1>Hi {username} 👋</h1>
    <Button variant="contained" onClick={logout}>Logout </Button>
    </div>
      
      <div className="addExpensesMainDiv">
       <AddExpense />
      </div>
    </div>
  );
};

export default Dashboard;
