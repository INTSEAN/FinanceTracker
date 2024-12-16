import React, { useContext } from 'react';
import { FinanceContext } from '../contexts/FinanceContext';
import jsPDF from 'jspdf';
import './ReportDownloader.css';

function ReportDownloader() {
  const { expenses, investments, bankBalans } = useContext(FinanceContext);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Financial Report', 14, 22);

    doc.setFontSize(12);
    doc.text(`Bank Balance: $${bankBalans}`, 14, 32);

    doc.text('Expenses:', 14, 42);
    expenses.forEach((exp, index) => {
      doc.text(
        `${index + 1}. ${exp.description} - $${exp.amount} (${exp.category})`,
        14,
        52 + index * 10
      );
    });

    doc.text('Investments:', 14, 62 + expenses.length * 10);
    investments.forEach((inv, index) => {
      doc.text(
        `${index + 1}. ${inv.description} - $${inv.amount}`,
        14,
        72 + expenses.length * 10 + index * 10
      );
    });

    doc.save('financial_report.pdf');
  };

  return (
    <div className="report-downloader" id="reports">
      <h3>Download Reports</h3>
      <button onClick={generatePDF}>Download PDF Report</button>
    </div>
  );
}

export default ReportDownloader; 