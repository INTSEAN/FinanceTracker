import React, { useContext } from 'react';
import { FinanceContext } from '../contexts/FinanceContext';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './GraphView.css';

function GraphView() {
  const { expenses, investments, bankBalans } = useContext(FinanceContext);

  const expenseCategories = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + parseFloat(curr.amount);
    return acc;
  }, {});

  const data = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        data: Object.values(expenseCategories),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#8A2BE2',
          '#00FA9A',
          '#FF7F50',
        ],
      },
    ],
  };

  return (
    <div className="graph-view" id="graphs">
      <h3>Financial Overview</h3>
      <div className="chart-container">
        <Pie data={data} />
      </div>
      <div className="balance-info">
        <p>Bank Balance: ${bankBalans}</p>
        <p>Total Investments: ${investments.reduce((acc, inv) => acc + inv.amount, 0)}</p>
      </div>
    </div>
  );
}

export default GraphView; 