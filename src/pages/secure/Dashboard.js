import React, { useEffect, useState } from "react";
import "../css/dashboard.css";
import AddExpense from "../../components/AddExpense";
import { isLoggedIn } from "../../auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import {  GetUserExpense } from "../../services/user-service";
import Footer from "../../components/Footer";
import CustomNavbar from "../../components/CustomNavbar";
import { ArrowRight } from 'lucide-react';
const Dashboard = () => {
  const [expenses, setExpenses] = useState();
  const [updateRequest,setUpdateRequest]=useState(true)
  const navigate = useNavigate();
  useEffect(() => {
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
  const goToDetails=()=>{
    navigate("/details")
  }


  return (
    <div className="dashboard">
      <CustomNavbar />
      <div className="addExpensesMainDiv">
        <AddExpense 
          checkUpdate={setUpdateRequest}
        />
      </div>
      <div className="Expensecs_Button">
      <b>We removed table we are working On It apologize</b>
        <h1>Total Spend {expenses}</h1>
        <Button variant="outlined" size="medium" onClick={goToDetails}  endIcon={<ArrowRight />}>
          Details
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
