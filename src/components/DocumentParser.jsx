import React, { useState, useContext } from 'react';
import { FinanceContext } from '../contexts/FinanceContext';
import Tesseract from 'tesseract.js';
import * as pdfjsLib from 'pdfjs-dist';
import './DocumentParser.css';
// import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;


// Dynamically set the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js`;

function DocumentParser() {
  const { addExpense } = useContext(FinanceContext);
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const mockAICategorize = (text) => {
    const lines = text.split('\n');
    const categorized = lines
      .map((line) => {
        const parts = line.split(' - $');
        if (parts.length === 2) {
          const description = parts[0].trim();
          const amount = parseFloat(parts[1]);
          let category = 'Uncategorized';

          if (description.toLowerCase().includes('groceries') || description.toLowerCase().includes('food')) {
            category = 'Food';
          } else if (description.toLowerCase().includes('electricity') || description.toLowerCase().includes('water')) {
            category = 'Utilities';
          }

          return { description, amount, category };
        }
        return null;
      })
      .filter((item) => item !== null);

    return categorized;
  };

  const handleParse = async () => {
    if (!file) {
      alert('Please select a file to parse.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File is too large. Please upload a file smaller than 5MB.');
      return;
    }

    setProcessing(true);
    setResult('');

    const fileType = file.type;

    try {
      let extractedText = '';

      if (fileType === 'application/pdf') {
        const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
        const maxPages = pdf.numPages;
        const pageTexts = [];

        for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          await page.render(renderContext).promise;
          const dataURL = canvas.toDataURL('image/png');

          const { data: { text } } = await Tesseract.recognize(dataURL, 'eng');
          pageTexts.push(text);
        }

        extractedText = pageTexts.join('\n');
      } else if (fileType.startsWith('image/')) {
        const { data: { text } } = await Tesseract.recognize(file, 'eng');
        extractedText = text;
      } else {
        throw new Error('Unsupported file type. Please upload an image or PDF.');
      }

      setResult(extractedText);
      const categorizedExpenses = mockAICategorize(extractedText);
      if (categorizedExpenses.length === 0) {
        alert('No expenses found in the document.');
      } else {
        categorizedExpenses.forEach((exp) => addExpense(exp));
        alert('Expenses successfully added.');
      }
    } catch (err) {
      console.error('Error parsing document:', err);
      alert(`Error: ${err.message}`);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="document-parser" id="parser">
      <h3>Document Parser</h3>
      <input type="file" accept="image/*,.pdf" onChange={handleFileChange} />
      <button onClick={handleParse} disabled={processing}>
        {processing ? 'Processing...' : 'Parse Document'}
      </button>
      {processing && <p>Parsing in progress. Please wait...</p>}
      {result && (
        <div className="parsed-text">
          <h4>Extracted Text:</h4>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

export default DocumentParser;
