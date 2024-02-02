"use client"

import './styleorder.css'

import { Container, Table } from 'react-bootstrap'; // Assuming you have installed react-bootstrap
import { FaCalendarAlt, FaCheckCircle, FaCircle, FaClipboardList, FaMoneyBillWave, FaShoppingCart, FaTimesCircle } from 'react-icons/fa'; // Import icons from react-icons
import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import Image from 'next/image';
import React from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

function OrderDetails() {

  const router = useRouter();

  const handleReceiptClick = (saleId) => {
    // Navigate to the receipt page for the clicked saleId
   // Example of creating a URL with a query parameter
const url = `./My_orders/get_reciept/${encodeURIComponent(saleId)}`;

    router.push(url)

  };


  const [salesData, setSalesData] = useState([]);
  let supplierId = null;

  useEffect(() => {

    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    supplierId = decodedToken.id;


    // Fetch sales data using Axios
    axios.get(`http://localhost:8086/api/supplier/sales/${supplierId}`)
      .then((response) => {
        const sortedSalesData = response.data.sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date));
      setSalesData(sortedSalesData);
      })
      .catch((error) => {
        alert("error")
        console.error('Error fetching sales data:', error);
      });
  }, [supplierId]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="main p-4">
      <div className="mt-2">
        <div className="container mt-4 p-4 rounded shadow-sm bg-gray">
          {salesData.map((sale, index) => (
            <div key={index} className="row mb-3" style={{ border: 'none', padding: '15px', transition: '0.3s', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <div className="col-4 col-sm-2">
                {/* Render image dynamically */}
                <Image
                  className="img-fluid rounded-start"
                  src={`/Productimage/${sale.image_link}`}
                  alt={sale.product_name}
                  height={100}
                  width={100}
                />
              </div>
              <div className="col-6 col-sm-4">
                <p className="mb-1 font-weight-bold text-black">
                  {sale.product_name}
                </p>
                <p className="mb-1">Quantity: {sale.quantity_sold}</p>
              </div>
              <div className="col-6 col-sm-2 text-center">
                <p className="mb-1">{sale.total_amount}</p>
                <button
                  className="receipt-button"
                  onClick={() => handleReceiptClick(sale.sale_id)}
                >
                  Get Receipt
                </button>

              </div>
              <div className="col-6 col-sm-4 text-end">
                <p className="mb-1">
                  <FaCircle color="green" size={12} />
                  <span style={{ marginLeft: "10px" }}>
                    Ordered on {formatDate(sale.sale_date)}
                  </span>
                </p>
                <p className="mb-0">
                  {sale.status_collected === "collected" ? (
                    <FaCheckCircle style={{ color: "green", marginRight: "5px" }} />
                  ) : (
                    <FaTimesCircle style={{ color: "red", marginRight: "5px" }} />
                  )}
                  {sale.status_collected}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}

export default OrderDetails;
