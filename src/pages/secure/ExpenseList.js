import React, { useEffect, useState } from "react";
import "../css/ExpenseList.css";
import CustomNavbar from "../../components/CustomNavbar";
import {
  Bar,
  BarChart,
  // CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowLeft } from 'lucide-react';
import { GetAllUserExpense } from "../../services/user-service";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p
          className="label"
          style={{ color: "black" }}
        >{`${label} : ${payload[0]?.value}₹`}</p>
      </div>
    );
  }

  return null;
};
const ExpenseList = () => {
  const navigate=useNavigate();
  const [userExpenses, setUserExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllUserExpense();
        if(response?.data?.expenses.length<=0){
          toast("Please Add expenses")
          navigate("/dashboard")
        }else{
          setUserExpenses(response?.data?.expenses); // Assuming response is in the format { data: [...] }
        }
        
      } catch (error) {
        console.log("Error fetching user expenses:", error);
      }
    };

    fetchData();
  }, [navigate]);
  const goBackToDashBoard=()=>{
    navigate("/dashboard")
  }
  console.log(userExpenses);
  return (
    <div className="ExpenseList">
      <CustomNavbar />
      <div className="bar-diagram-expence">
        <ResponsiveContainer>
          <BarChart width={230} height={250} data={userExpenses}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="product" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Legend />
            <Bar dataKey="totalSpend" fill="#8884d8" barGap={"40%"} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="backButton">
        <Button onClick={goBackToDashBoard} startIcon={<ArrowLeft />} variant="outlined">Add New Expence</Button>
      </div>
    </div>
  );
};
export default ExpenseList;
