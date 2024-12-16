import React, { createContext, useState } from 'react';

export const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [bankBalans, setBankBalans] = useState(0);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const addInvestment = (investment) => {
    setInvestments([...investments, investment]);
  };

  const updateBankBalance = (amount) => {
    setBankBalans(bankBalans + amount);
  };

  return (
    <FinanceContext.Provider
      value={{
        expenses,
        investments,
        bankBalans,
        addExpense,
        addInvestment,
        updateBankBalance,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
} 