import React, { useEffect, useState } from "react";
import "../css/dashboard.css";
import AddExpense from "../../components/AddExpense";
import { doLogout, getCurrentUser, isLoggedIn } from "../../auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import {  GetUserExpense } from "../../services/user-service";
import Footer from "../../components/Footer";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [expenses, setExpenses] = useState();
  const [updateRequest,setUpdateRequest]=useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    setUsername(getCurrentUser());
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);
  useEffect(() => {
    GetUserExpense()
      .then((response) => {
        setExpenses(response?.data?.totalSpend);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [updateRequest]);
  const logout = () => {
    doLogout(() => {
      navigate("/login");
    });
  };

  return (
    <div className="dashboard">
      <div className="main_usernav">
        <h1>Hi {username} 👋</h1>

        <Button variant="contained" onClick={logout}>
          Logout{" "}
        </Button>
      </div>

      <div className="addExpensesMainDiv">
        <AddExpense 
          checkUpdate={setUpdateRequest}
        />
      </div>
      <div className="Expensecs_Button">
      <b>We removed table we are working On It apologize</b>
        <h1>Total Spend {expenses}</h1>
        <Button variant="outlined" size="medium">
          Expenses
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
