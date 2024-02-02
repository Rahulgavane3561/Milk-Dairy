"use client"

import { Button, Form, Pagination, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import axios from 'axios';

function Page() {
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [collectionTime, setCollectionTime] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currentPage, startDate, endDate, supplierId, collectionTime]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8086/api/admindata/MilkData', {
        params: { startDate, endDate, supplierId, collectionTime },
      });
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString();
    return formattedDate;
  };

  const formatTime = (time) => {
    const formattedTime = new Date(time).toLocaleTimeString();
    return formattedTime;
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div>
      {/* Top Row */}
      <div className="row" style={{ height: '30vh' }}>
        {/* Content in the top row goes here */}
        <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-3">
            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label>Supplier ID</label>
            <input
              type="number"
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label>Collection Time</label>
            <select
              value={collectionTime}
              onChange={(e) => setCollectionTime(e.target.value)}
              className="form-control"
            >
              <option value="">All</option>
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Apply Filters
        </button>
      </form>
      </div>

      {/* Table Section */}
      <div className="container-fluid mt-4">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
            <th scope="col">#</th>
              <th scope="col">Supplier ID</th>
              <th scope="col">Collected Date</th>
              <th scope="col">Fat Content</th>
              <th scope="col">Quantity (Liter)</th>
              <th scope="col">Collection Time</th>
              <th scope="col">Amount</th>
              <th scope="col">Payment Status</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
          {currentRows.map((row, index) => (
              <tr key={index + 1}>
                <th scope="row">{index + 1}</th>
                <td>{row.supplier_id}</td>
                <td>{formatDate(row.collected_date)}</td>
                <td>{row.fat_content}</td>
                <td>{row.quantity_liter}</td>
                <td>{row.collection_time}</td>
                <td>{row.amount}</td>
                <td>{row.payment_status}</td>
                {/* Add more columns as needed */}
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination */}
        <Pagination>
          <Pagination.Prev
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </Pagination.Prev>

          {[...Array(Math.ceil(data.length / rowsPerPage)).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === Math.ceil(data.length / rowsPerPage)}
          >
            Next
          </Pagination.Next>
        </Pagination>
      </div>
    </div>
  );
}

export default Page;
