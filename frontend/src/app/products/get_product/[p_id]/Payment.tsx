// Payment.js

import './Payment.css';

import React, { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import Styles from './product.module.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

const Payment = ({ productId, quantity, totalPrice, onClose }) => {
  const [years, setYears] = useState([]);
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('01');
  const [expiryYear, setExpiryYear] = useState(new Date().getFullYear().toString().slice(-2));
  const [cvv, setCVV] = useState('');
  const [paymentOption, setPaymentOption] = useState('pod'); // 'pod' for Pay on Delivery, 'card' for Card Payment
  const [cardFieldsRequired, setCardFieldsRequired] = useState(false);
  const [supplierId, setSupplierId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchSupplierId = async () => {
      try {
        const token = Cookies.get('token');
        const decodedToken = jwtDecode(token);
        const fetchedSupplierId = decodedToken.id;
        setSupplierId(fetchedSupplierId);
      } catch (error) {
        console.error('Error fetching supplierId:', error);
      }
    };

    fetchSupplierId();

    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 6 }, (_, index) => currentYear + index);
    setYears(yearOptions);
  }, []);

  // =====================================Card number format====================


  const formatCardNumber = (inputValue) => {
    const numericValue = inputValue.replace(/\D/g, '');
    const formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, '$1-');
    return formattedValue;
  };

  const handleCardNumberChange = (event) => {
    const inputValue = event.target.value;
    const formattedValue = inputValue.replace(/\D/g, '');
    setCardNumber(formattedValue);
  };

  const handleCardholderNameChange = (event) => {
    setCardholderName(event.target.value);
  };

  const handleExpiryMonthChange = (event) => {
    setExpiryMonth(event.target.value);
  };

  const handleExpiryYearChange = (event) => {
    setExpiryYear(event.target.value);
  };

  const handleCVVChange = (event) => {
    const numericValue = event.target.value.replace(/\D/g, '');
    setCVV(numericValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let requestData;

      if (paymentOption === 'pod') {
        // If Pay on Delivery is selected, send only the query
        requestData = {
          token: 67, // Replace with the actual token from the client side
          amount: totalPrice,
          paymentOption: 'pod',
          quantity: quantity,
          supplierId: supplierId,
          ProductId: productId
        };
      } else if (paymentOption === 'card') {
        // If Card Payment is selected, send all card information
        requestData = {
          token: 67, // Replace with the actual token from the client side
          amount: totalPrice,
          paymentOption: 'card',
          cardNumber,
          cardholderName,
          expiryMonth,
          expiryYear,
          cvv,
          quantity: quantity,
          supplierId: supplierId,
          ProductId: productId
          // Add more card information as needed
        };
      }

      const response = await axios.post('http://localhost:8086/api/product/getpayment', requestData);
      if (response.status === 200 && response.data.success) {
        // If payment is successful, navigate to /myorders
        router.push(`/signin/supplierprofile/${supplierId}/components/My_orders`);
      } else {
        // Handle other cases as needed
        console.error('Error processing payment:', response.data.message);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div className={Styles.payment_modal}>
      <div className="mainp">
        <button className={Styles.close_button} onClick={onClose}>X</button>
        <div className="containera">
          <form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <div className="card__container">
              <div className="card">
                <div className="row paypal">
                  <div className="left col-9">
                    <input
                      id="pp"
                      type="radio"
                      name="payment"
                      checked={paymentOption === 'pod'}
                      onChange={() => setPaymentOption('pod')}
                    />
                    <label htmlFor="pp">Pay on delivery</label>
                  </div>
                  <div className="right col-1">
                    <img src="/CardIcon/POD.png" alt="paypal" />
                  </div>
                </div>
                <div className="row credit">
                  <div className="left col-5">
                    <input
                      id="cd"
                      type="radio"
                      name="payment"
                      checked={paymentOption === 'card'}
                      onChange={() => setPaymentOption('card')}
                    />
                    <label htmlFor="cd">Debit/ Credit Card</label>
                  </div>
                  <div className="right col-6">
                    <img src="/CardIcon/Visa.png" alt="visa" />
                    <img src="/CardIcon/MasterCard.png" alt="mastercard" />
                    <img src="/CardIcon/Amex.png" alt="amex" />
                    <img src="/CardIcon/Maestro.png" alt="maestro" />
                  </div>
                </div>
                <div className="row cardholder">
                  <div className="info">
                    <label htmlFor="cardholdername">Name</label>
                    <input
                      placeholder="e.g. Richard Bovell"
                      id="cardholdername"
                      type="text"
                      value={cardholderName}
                      onChange={(e) => setCardholderName(e.target.value)}
                      placeholder="Cardholder Name"
                    />
                  </div>
                </div>
                <div className="row number">
                  <div className="info">
                    <label htmlFor="cardnumber">Card number</label>
                    <input
                      id="cardnumber"
                      type="text"
                      // pattern="[0-9]{16,19}"
                      maxLength="19"
                      placeholder="8888-8888-8888-8888"
                      value={formatCardNumber(cardNumber)}
                      onChange={handleCardNumberChange}
                    />
                  </div>
                </div>
                <div className="row details">
                  <div className="dropdown-container left">
                    <label className="dropdown-label" htmlFor="expiry-month">
                      Expiry
                    </label>
                    <select className="dropdown-select" id="expiry-month" value={expiryMonth} onChange={handleExpiryMonthChange}>
                      {Array.from({ length: 12 }, (_, index) => (
                        <option key={index + 1} value={String(index + 1).padStart(2, '0')} className="dropdown-option">
                          {String(index + 1).padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    <span className="dropdown-separator">/</span>
                    <select className="dropdown-select" id="expiry-year" value={expiryYear} onChange={handleExpiryYearChange}>
                      {years.map((year) => (
                        <option key={year} value={year} className="dropdown-option">
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="right">
                    <label for="cvv">CVC/CVV</label>
                    <input
                      type="text"
                      maxLength="3"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCVV(e.target.value)}
                    />
                    <span data-balloon-length="medium" data-balloon="The 3 or 4-digit number on the back of your card." data-balloon-pos="up">i</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="buttona">

              <button type="submit">
                <i className="ion-locked"></i> Confirm and Pay ₹{totalPrice}</button>
            </div>
          </form>
        </div>
      </div>

    </div>


  );
};

export default Payment;
