"use client"

import { FaCheckCircle, FaChevronDown, FaChevronUp, FaTimesCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import { BsCalendar } from 'react-icons/bs';
import Cookies from 'js-cookie';
import { FaMoneyBillAlt } from 'react-icons/fa';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const PaymentPage = () => {
  const [milkBills, setMilkBills] = useState([]);
  const [advancedPayment, setAdvancedPayment] = useState(null);
  const [advanceDetails, setAdvanceDetails] = useState([]);
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleGivenBack = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  useEffect(() => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const supplierId = decodedToken.id;

    // Fetch milk bills data
    axios.get(`http://localhost:8086/api/supplier/milkCollectionByMonth/${supplierId}`)
      .then(response => {
        // Sort milk bills by groupMonth in descending order
        const sortedBills = response.data.slice().sort((a, b) => {
          return new Date(b.groupMonth) - new Date(a.groupMonth);
        });
        setMilkBills(sortedBills);
      })
      .catch(error => {
        console.error('Error fetching milk bills:', error);
      });

    // Fetch advanced payment data
    axios.get(`http://localhost:8086/api/supplier/advanced_amount/${supplierId}`)
      .then(response => {
        setAdvanceDetails(response.data);
        console.log('Advance details:', advanceDetails);
      })
      .catch(error => {
        console.error('Error fetching advance details:', error);
      });
  }, []);


  const renderMilkBills = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
      milkBills.map((bill, index) => {
        const date = new Date(bill.groupMonth);
        const monthName = months[date.getMonth()];

        return (
          <div key={index} className="col-md-12 mb-3">
            <div className="card" style={{ border: 'none', padding: '15px', transition: '0.3s', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '8px' }}>
   
              <div className="row">
                <div className="col-6">
                  <p className="card-text">Amount: ₹{bill.totalAmount}</p>
                  <p className="card-text">Month: {monthName}</p>
                </div>
                <div className="col-6">
                  <p className="card-text">
                    Status: {bill.payment_status === 'done' ? <FaCheckCircle style={{ color: 'green', marginRight: '5px' }} /> : <FaTimesCircle style={{ color: 'red', marginRight: '5px' }} />}
                    {bill.payment_status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })
    );
  };

  const renderAdvancedPayment = () => {
    return (

      <div>
        {advanceDetails.map((advanceData, index) => (
          <div key={index} className="col-md-12 mb-3">
            <div className="card" style={{ border: 'none', padding: '15px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <div className="row">
                <div className="row">
                  <div className="col-6">
                    <p>Date: {formatDate(advanceData.advance.date)}</p>
                    <p>Amount: ₹{advanceData.advance.amount}</p>
                  </div>
                  <div className="col-6">
                    <p>Pending Amount: ₹{advanceData.pending}</p>
                    <h6 onClick={() => toggleGivenBack(index)}>
                      Given Back {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                    </h6>
                  </div>
                </div>
                <div className="col-12">
                  <div>                  
                    {openIndex === index && (
                   
                      <div>
                           <hr />
                        {advanceData.givenBack.map((given, idx) => (
                          <div key={idx} className='d-flex row'>
                            <p className='col-md-6 col-sm-12' >Date: {formatDate(given.date)}</p>
                            <p className='col-md-6 col-sm-12'>Returned Amount: ₹{given.returned_amount}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className=' p-4 row'>
      <div className='col-md-6 col-sm-12'>
      <h6 className="card-title">Milk Bill</h6>
        <div className='mb-3' style={{ maxHeight: '100vh', overflowY: 'auto' }}>
     
          {renderMilkBills()}
        </div>
      </div>
      <div className='col-md-6 col-sm-12'>
                  <h6>Advance amount</h6>
        {renderAdvancedPayment()}
      </div>
    </div>
  );
};

export default PaymentPage;
