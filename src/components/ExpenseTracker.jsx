import React, { useContext, useState } from 'react';
import { FinanceContext } from '../contexts/FinanceContext';
import './ExpenseTracker.css';

function ExpenseTracker() {
  const { expenses, addExpense } = useContext(FinanceContext);
  const [expense, setExpense] = useState({ description: '', amount: '', category: '' });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({ ...expense, id: Date.now() });
    setExpense({ description: '', amount: '', category: '' });
  };

  return (
    <div className="expense-tracker" id="tracker">
      <h3>Expense Tracker</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          value={expense.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
        />
        <input
          type="text"
          name="category"
          value={expense.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <button type="submit">Add Expense</button>
      </form>
      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>
            {exp.description} - ${exp.amount} ({exp.category})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseTracker; 