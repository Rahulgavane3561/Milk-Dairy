"use client"

import { useEffect, useState } from 'react';

const MilkDetails = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Function to generate random table values
    const generateRandomTableValues = () => {
      const data = [];
      for (let i = 0; i < 10; i++) {
        const rowData = {
          collected_date: `2024-01-${Math.floor(Math.random() * 30) + 1}`,
          fat_content: (Math.random() * 5).toFixed(2),
          quantity_liter: (Math.random() * 20).toFixed(2),
          collection_time: Math.random() > 0.5 ? 'morning' : 'evening',
          amount: (Math.random() * 100).toFixed(2),
        };
        data.push(rowData);
      }
      return data;
    };

    // Set initial table data
    const initialData = generateRandomTableValues();
    setTableData(initialData);
  }, []);

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
    // Implement filtering based on 'from' date
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
    // Implement filtering based on 'to' date
  };

  return (
    <div className='p-4'>
      <h2>History</h2>
      <div className='row'>
        <div className="col-md-5">
          <label htmlFor="fromDate" className="form-label">From Date:</label>
          <input
            type="date"
            className="form-control"
            id="fromDate"
            value={fromDate}
            onChange={handleFromDateChange}
          />
        </div>

        <div className="col-md-5">
          <label htmlFor="toDate" className="form-label">To Date:</label>
          <input
            type="date"
            className="form-control"
            id="toDate"
            value={toDate}
            onChange={handleToDateChange}
          />
        </div>
        <div className='col-md-2'>
          <button className="btn btn-primary">Filter</button>
        </div>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="bg-primary text-white">
          <tr>
            <th>Collected Date</th>
            <th>Fat Content</th>
            <th>Quantity (L)</th>
            <th>Collection Time</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.collected_date}</td>
              <td>{row.fat_content}</td>
              <td>{row.quantity_liter}</td>
              <td>{row.collection_time}</td>
              <td>{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MilkDetails;
