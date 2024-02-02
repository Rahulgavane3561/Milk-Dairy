"use client"

import './Orders.css';

import React, { useEffect, useState } from 'react';

import axios from 'axios';
import jsPDF from 'jspdf';

const OrderDetails = ({ params, any }) => {
  const orderId = params.p_id;
  const [orderData, setOrderData] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        alert(orderId)
        const response = await axios.get(`http://localhost:8086/api/supplier/getOrderDetails/${orderId}`);
        setOrderData(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchData();
  }, [orderId]);
  const calculateTotalAmount = () => {
    if (orderData) {
      return orderData.total_amount;
    }
    return 0;
  };

  const downloadPDF = () => {
    if (!orderData) {
      return;
    }
  
    const doc = new jsPDF();
  
    // Set background color and font color for the header
    doc.setFillColor(0, 102, 204); // Blue background color
    doc.setTextColor(255, 255, 255); // White font color
    doc.rect(0, 0, doc.internal.pageSize.width, 20, 'F'); // Header background
  
    // Set font size and style for the header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
  
    // Header content
    doc.text('Nexus Dairy', 15, 15);
  
    // Reset font style
    doc.setFont('helvetica', 'normal');
  
    // Content styling
    doc.setFillColor(245, 245, 245); // Light gray background color for the content
    doc.rect(0, 20, doc.internal.pageSize.width, doc.internal.pageSize.height - 20, 'F'); // Content background
  
    // Content
    const content = `
      Invoice
  
      Nexus Dairy
      
      Date:           ${formatDate(orderData.sale_date)}
  
      Consumer Name:  ${orderData.supplier_name}
      
      Product Type:    ${orderData.product_name}

      Quantity:        ${orderData.quantity_sold}
      
      Amount:          ₹${orderData.total_amount}
  
      Total Amount:    ₹${calculateTotalAmount()}
    `;
  
    // Set font size and color for content
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black font color
  
    // Split the content into lines and add them to the PDF
    const lines = doc.splitTextToSize(content, doc.internal.pageSize.width - 30);
    doc.text(15, 30, lines);
  
    // Save the PDF with a specific filename
    doc.save('Nexusreceipt.pdf');
  };
  
  
  
  

  return (
    <div className=" reciept_main mt-4">
      <div className="order_container">
        <div>
          <button onClick={downloadPDF} className="btn btn-primary">Download Receipt (PDF)</button>
          <h1>Order Details</h1>
        </div>
        {orderData ? (
          <div className="receipt_container">
            <div className="receipt-header">
              <h4>Invoice</h4>
              <p>Date: {formatDate(orderData.sale_date)}</p>
            </div>
            <div className="receipt-details">
              <p>Consumer Name: {orderData.supplier_name}</p>
            </div>
            <div className="receipt-items">
              <div className="receipt-item">
                <p>Product Name: {orderData.product_name}</p>
                <p>Quantity: {orderData.quantity_sold}</p>
                <p>Amount: ₹{orderData.total_amount}</p>
              </div>
            </div>
            <div className="receipt-total">
              <p>Total Amount: ₹{calculateTotalAmount()}</p>
            </div>
          </div>
        ) : (
          <p>Loading order details...</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
