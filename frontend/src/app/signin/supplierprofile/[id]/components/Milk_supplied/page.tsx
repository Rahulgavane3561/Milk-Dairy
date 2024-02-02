"use client"

import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const MilkDetails = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [tableData, setTableData] = useState([]);

  useEffect(() => {

    // Fetch data from backend when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = Cookies.get('token');
      const decodedToken = jwtDecode(token);
      const supplierId = decodedToken.id;
      // Make a GET request to your Node.js backend endpoint
      const queryParams = `?fromDate=${fromDate}&toDate=${toDate}`;

      const response = await axios.get(`http://localhost:8086/api/supplier/milkCollectionData/${supplierId}${queryParams}`); // Replace with your endpoint

      // Assuming response.data contains the fetched data from backend
      setTableData(response.data);
    } catch (error) {
      // Handle error
      console.error('Error fetching data:', error);
    }
  };
  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
    // Implement filtering based on 'from' date
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
    // Implement filtering based on 'to' date
  };

  const formatDate = (originalDate) => {
    const date = new Date(originalDate);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    return formattedDate;
  };

  const handleFilter = () => {
    // Trigger fetching data when the Filter button is clicked
    fetchData();
  };

  return (
    <div className='p-4'>

      <div className='row mb-3'>
        <div className="col-md-5">
          <label htmlFor="fromDate" className="form-label">From :</label>
          <input
            type="date"
            className="form-control"
            id="fromDate"
            value={fromDate}
            onChange={handleFromDateChange}
          />
        </div>

        <div className="col-md-5">
          <label htmlFor="toDate" className="form-label">To :</label>
          <input
            type="date"
            className="form-control"
            id="toDate"
            value={toDate}
            onChange={handleToDateChange}
          />
        </div>
        <div className='col-md-2'>
          <button className="btn btn-success mt-1" style={{ width: '80%' }} onClick={handleFilter}>Filter</button>
        </div>
      </div>

      
      <table className="table  table-striped">
        <thead className="bs-yellow text-white ">
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
            <tr key={index} style={{ backgroundColor: 'purple', color: 'white' }}>
              <td>{formatDate(row.collected_date)}</td>
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
