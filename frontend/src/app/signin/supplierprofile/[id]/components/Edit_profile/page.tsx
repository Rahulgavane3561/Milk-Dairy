"use client"

import React, { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import styles from './Edit_profile.module.css';

function History() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bankAccount: '',
    ifscCode: '',
    adharNumber: '',
    address: '',
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [supplierId, setSupplierId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {

    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const currentSupplierId = decodedToken.id;
    setSupplierId(currentSupplierId);

    axios.get(`http://localhost:8086/api/supplie/getsupplier/${currentSupplierId}`)
      .then((response) => {
        const { name, email, phone, bank_account, ifsc_code, adhar_number, address, image } = response.data;
        setFormData({
          name,
          email,
          phone,
          bankAccount: bank_account,
          ifscCode: ifsc_code,
          adharNumber: adhar_number,
          address,
          image,
        });
      })
      .catch((error) => {
        console.error('Error fetching supplier data:', error);
      });

  }, []);

  const handleImageChange = (e) => {
    // Check if files were selected
    if (e.target.files.length > 0) {      
      setFormData({
        ...formData,
        image: e.target.files[0], // Update the image in the state with the newly selected file
      });
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('phone', formData.phone);
      form.append('bankAccount', formData.bankAccount);
      form.append('ifscCode', formData.ifscCode);
      form.append('adharNumber', formData.adharNumber);
      form.append('address', formData.address);
      form.append('image', formData.image);


      axios.put(`http://localhost:8086/api/supplie/updatesupplier/${supplierId}`, form)
        .then((response) => {
          console.log('Form submitted:', response.data);
          window.scrollTo(0, 0);
          setSuccessMessage(true);
          setTimeout(() => {
            setSuccessMessage(false);
          }, 8000);
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
        });
    }
  };

  const validateFormData = (data) => {
    const errors = {};

    if (!data.name.trim() || data.name.trim().length < 3 || !/^[a-zA-Z ]+$/.test(data.name.trim())) {
      errors.name = 'Name should be at least 3 characters and contain only letters';
    }

    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errors.email = 'Please enter a valid email';
    }

    if (!data.phone.trim() || !/^\d{10}$/.test(data.phone.trim())) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }


    if (!data.bankAccount.trim()) {
      errors.bankAccount = 'Bank account number is required';
    }

    if (!data.ifscCode.trim()) {
      errors.ifscCode = 'IFSC code is required';
    } else if (!/^[A-Za-z]{4}[0-9]{7}$/.test(data.ifscCode.trim())) {
      errors.ifscCode = 'Please enter a valid 11-character alphanumeric IFSC code';
    }

    // Aadhar number validation
    if (!data.adharNumber.trim() || !/^\d{12}$/.test(data.adharNumber.trim())) {
      errors.adharNumber = 'Please enter a valid 12-digit Aadhar number';
    }

    return errors;
  };

  return (
    <div className={styles.historyContainer}>
     {successMessage && (
        <div className={styles.successMessage}>
          <span>Updated successfully!</span>
          <button onClick={() => setSuccessMessage(false)}>X</button>
        </div>
      )}
      
      <form className={styles.supplierForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            className={styles.inputfield}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            className={styles.inputfield}
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone:</label>
          <input
            className={styles.inputfield}
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="bankAccount">Bank Account:</label>
          <input
            className={styles.inputfield}
            type="text"
            id="bankAccount"
            name="bankAccount"
            value={formData.bankAccount}
            onChange={handleChange}
          />
          {errors.bankAccount && <span style={{ color: 'red' }}>{errors.bankAccount}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="ifscCode">IFSC Code:</label>
          <input
            className={styles.inputfield}
            type="text"
            id="ifscCode"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
          />
          {errors.ifscCode && <span style={{ color: 'red' }}>{errors.ifscCode}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="adharNumber">Adhar Number:</label>
          <input
            className={styles.inputfield}
            type="text"
            id="adharNumber"
            name="adharNumber"
            value={formData.adharNumber}
            onChange={handleChange}
          />
          {errors.adharNumber && <span style={{ color: 'red' }}>{errors.adharNumber}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">Address:</label>
          <input
            className={styles.inputfield}
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <span style={{ color: 'red' }}>{errors.address}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">Image:</label>
          <input
            className={styles.inputfield}
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
          {errors.image && <span style={{ color: 'red' }}>{errors.image}</span>}
        </div>
        <button type="submit" className={`${styles.btn} ${styles.btnCustom}`}>
          Save changes
        </button>
      </form>

    </div>
  );
}

export default History;
