import React from 'react';
import { FinanceProvider } from './contexts/FinanceContext';
import Navbar from './components/Navbar';
import ExpenseTracker from './components/ExpenseTracker';
import DocumentParser from './components/DocumentParser';
import GraphView from './components/GraphView';
import ReportDownloader from './components/ReportDownloader';
import './App.css';

function App() {
  return (
    <FinanceProvider>
      <div id="root">
        <Navbar />
        <ExpenseTracker />
        <DocumentParser />
        <GraphView />
        <ReportDownloader />
      </div>
    </FinanceProvider>
  );
}

export default App;
