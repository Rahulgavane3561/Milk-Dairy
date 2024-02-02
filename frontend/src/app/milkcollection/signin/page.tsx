"use client"

import React, { useState } from 'react';

import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const inputStyle = {
  padding: '10px',
  margin: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '30%',
};

const buttonStyle = {
  padding: '10px',
  fontSize: '16px',
  width: '30%',
  backgroundColor: '#4CAF50',
  color: 'white',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  margin: '30px 0px 10% 0px'
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '50px',
};

const errorStyle = {
  color: 'red',
  marginTop: '10px',
};


function Page() {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    const dataToSave = {
      inputValue: inputValue,
    };

    try {
      const response = await axios.post('http://localhost:8086/api/milkcollection/varificationcode', dataToSave);

      if (response.data.success) {
        console.log('Successful response:', response.data.message);
        Cookies.set('isAuthenticated', inputValue);
        router.push('../milkcollection/home');
      } else {
        console.log('Error:', response.data.message);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
      
      setErrorMessage('An error occurred while processing your request.');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center h-100 p-5">
      <div className="col-md-6 col-lg-4 d-flex flex-column align-items-center">
        <label htmlFor="inputField" className="text-center mb-4">
          Enter Verification Key:
        </label>
        <input
          type="text"
          id="inputField"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="form-control form-control-lg w-100 mb-4 border-success"
          placeholder="453678"
          onFocus={() => {
            document.getElementById('inputField').style.borderColor ='#ccc' ; 
          }}
          onBlur={() => {
            document.getElementById('inputField').style.borderColor = '#007bff'; 
          }}
          
        />
        {errorMessage && <div style={errorStyle}>{errorMessage}</div>}

        <button className="btn btn-lg btn-success w-100 mt-4 rounded-pill" onClick={handleSubmit}>
          Submit Verification
        </button>
      </div>
    </div>
  );
}

export default Page;
