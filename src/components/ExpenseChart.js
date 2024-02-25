import React from 'react';
import { Bar } from 'react-chartjs-2';

const ExpenseChart = ({ expenses }) => {
  // Extracting labels and data from the expenses
  const labels = expenses.map(item => item.product);
  const data = expenses.map(item => item.totalSpend);

  // Chart data
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Total Spend',
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Blue color
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  // Chart options
  const chartOptions = {
    scales: {
      x: {
        type: 'category', // Use category scale for the x-axis
        ticks: {
          beginAtZero: true
        }
      },
      y: {
        ticks: {
          beginAtZero: true
        }
      }
    }
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default ExpenseChart;
