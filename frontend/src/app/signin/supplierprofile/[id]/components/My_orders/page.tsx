import { Container, Table } from 'react-bootstrap'; // Assuming you have installed react-bootstrap
import { FaCalendarAlt, FaCheckCircle, FaClipboardList, FaMoneyBillWave, FaShoppingCart } from 'react-icons/fa'; // Import icons from react-icons

import React from 'react';

function OrderDetails() {
  const orders = [
    { id: 1, productName: 'Product A', quantity: 2, date: '2023-12-15', amount: 50, status: 'Delivered', collected: true },
    { id: 1, productName: 'Product A', quantity: 2, date: '2023-12-15', amount: 50, status: 'Delivered', collected: true },
    { id: 1, productName: 'Product A', quantity: 2, date: '2023-12-15', amount: 50, status: 'Delivered', collected: true },
    { id: 1, productName: 'Product A', quantity: 2, date: '2023-12-15', amount: 50, status: 'Delivered', collected: true },
    { id: 1, productName: 'Product A', quantity: 2, date: '2023-12-15', amount: 50, status: 'Delivered', collected: true },
    { id: 1, productName: 'Product A', quantity: 2, date: '2023-12-15', amount: 50, status: 'Delivered', collected: true },
    { id: 1, productName: 'Product A', quantity: 2, date: '2023-12-15', amount: 50, status: 'Delivered', collected: true },
    { id: 1, productName: 'Product A', quantity: 2, date: '2023-12-15', amount: 50, status: 'Delivered', collected: true },
    { id: 1, productName: 'Product A', quantity: 2, date: '2023-12-15', amount: 50, status: 'Delivered', collected: true },
    { id: 1, productName: 'Product A', quantity: 2, date: '2023-12-15', amount: 50, status: 'Delivered', collected: true },
    { id: 1, productName: 'Product A', quantity: 2, date: '2023-12-15', amount: 50, status: 'Delivered', collected: true },
    { id: 1, productName: 'Product A', quantity: 2, date: '2023-12-15', amount: 50, status: 'Delivered', collected: true },
    { id: 1, productName: 'Product A', quantity: 2, date: '2023-12-15', amount: 50, status: 'Delivered', collected: true },
    { id: 1, productName: 'Product A', quantity: 2, date: '2023-12-15', amount: 50, status: 'Delivered', collected: true },
    { id: 1, productName: 'Product A', quantity: 2, date: '2023-12-15', amount: 50, status: 'Delivered', collected: true },
    { id: 1, productName: 'Product A', quantity: 2, date: '2023-12-15', amount: 50, status: 'Delivered', collected: true },
    // Add more order details as needed
  ];
  const totalQuantity = orders.reduce((total, order) => total + order.quantity, 0);
  const totalAmount = orders.reduce((total, order) => total + order.amount, 0);

  return (
    <Container className='p-4'>
      <h2>My Orders</h2>
      <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 40vh)' }}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th><FaShoppingCart /> Product Name</th>
              <th><FaClipboardList /> Quantity</th>
              <th><FaCalendarAlt /> Date</th>
              <th><FaMoneyBillWave /> Amount</th>
              <th>Collected</th>
              <th><FaCheckCircle /> Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{order.date}</td>
                <td>{order.amount}</td>
                <td>{order.collected ? 'Yes' : 'No'}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <Table striped bordered hover responsive>
          <tbody>
            <tr>
              <th style={{ width: '50%', fontWeight: 'bold' }}><i className="fas fa-cubes"></i>Total Quantity:{totalQuantity}</th>
              <th style={{ width: '50%', fontWeight: 'bold' }}><i className="fas fa-money-bill-wave"></i> Total Amount:{totalAmount}</th>
            
            </tr>

          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default OrderDetails;
