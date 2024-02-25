import React from 'react';
import "./css/ExpenseList.css"
const ExpenseList = ({ expenses }) => {
  return (
    <div className='ExpenseList'>
    <h4>**Currently we showing data in table format we are updating our service to show data in various format**</h4>
      <h2>All Expenses</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Total Spend</th>
            <th>Buying Timings</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense._id}>
              <td>{expense.product}</td>
              <td>{expense.totalSpend}</td>
              <td>
                <ul>
                  {expense.buyingTimings.map(buyingTime => (
                    <li key={buyingTime._id}>
                      <strong>Spend:</strong> {buyingTime.spend},{' '}
                      <strong>Description:</strong> {buyingTime.description},{' '}
                      <strong>Buying Time:</strong> {new Date(buyingTime.buyingTime).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
