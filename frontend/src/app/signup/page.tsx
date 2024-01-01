"use client"

import Link from 'next/link';
import axios from 'axios';
import styles from './signup.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Registration() {
    const router = useRouter();

    // ======================================================================================


    // ===========================================================================================
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        bankAccount: '',
        ifscCode: '',
        adharNumber: '',
        password: '',
        confirmPassword: '',
        image: null,
    });

    const [errors, setErrors] = useState({});
    const [responseError, setResponseError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0], 
        });
    };


    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            address: '',
            bankAccount: '',
            ifscCode: '',
            adharNumber: '',
            password: '',
            confirmPassword: '',
            image: null,
        });
        setErrors({});
        setResponseError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

  
        const validationErrors = validateFormData(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; 
        } else {
            const form = new FormData();
            form.append('name', formData.name);
            form.append('email', formData.email);
            form.append('phone', formData.phone);
            form.append('address', formData.address);
            form.append('bankAccount', formData.bankAccount);
            form.append('ifscCode', formData.ifscCode);
            form.append('adharNumber', formData.adharNumber);
            form.append('password', formData.password);
            form.append('image', formData.image);
            alert("sending");

            axios.post('http://localhost:8086/api/supplie/tempsupplierregister', form)

                .then((response) => {
                    alert("sumbit")
                    console.log('Form submitted:', response.data);
                    const { userId, phone } = response.data;

                    router.push(`../signup/otp_varify/${userId}`);

                  
                    resetForm();

                })
                .catch((error) => {
                    if (error.response) {
                        setResponseError(error.response.data.message);
                    } else {
                        setResponseError('Something went wrong. Please try again.');
                    }
                });
        }
    };

    const validateFormData = (data) => {
        const errors = {};

        if (!data.name.trim()) {
            errors.name = 'Name is required';
        } else if (data.name.trim().length < 5 || /\d/.test(data.name.trim())) {
            errors.name = 'Name should be at least 5 characters long and cannot contain numbers';
        }

        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(data.email)) {
            errors.email = 'Please enter a valid email';
        }

        if (!data.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(data.phone.trim())) {
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

        if (!data.adharNumber.trim()) {
            errors.adharNumber = 'Aadhar number is required';
        } else if (!/^\d{12}$/.test(data.adharNumber.trim())) {
            errors.adharNumber = 'Please enter a valid 12-digit Aadhar number';
        }

        if (!data.password.trim()) {
            errors.password = 'Password is required';
        } else if (data.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }

        if (data.password !== data.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };



    // =========================================================================================================================

    // =======================================================================================================================

    return (
        <div className={styles.mainback}>
            <div><h2>Sign Up</h2></div>


            <div className={styles.signupContainer}>
                <form className={styles.signupForm} onSubmit={handleSubmit}>

                    <div className="row">

                        <div className={`col-md-6 `}>
                            <div className={styles.leftSide}>
                                <label>
                                    Name:
                                    <input className={styles.input} style={{ marginLeft: '74px' }} type="text" name="name" value={formData.name} onChange={handleChange} />
                                    {errors.name && <span style={{ color: 'red', marginLeft: '70px' }}>{errors.name}</span>}
                                </label>
                                <label>
                                    Email:
                                    <input className={styles.input} style={{ marginLeft: '79px' }} type="email" name="email" value={formData.email} onChange={handleChange} />
                                    {errors.email && <span style={{ color: 'red', marginLeft: '70px' }}>{errors.email}</span>}
                                </label>

                                <label>
                                    Bank Account:
                                    <input className={styles.input} style={{ marginLeft: '16px' }} type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} />
                                    {errors.bankAccount && <span style={{ color: 'red', marginLeft: '70px' }}>{errors.bankAccount}</span>}
                                </label>
                                <label>
                                    IFSC Code:
                                    <input className={styles.input} style={{ marginLeft: '40px' }} type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} />
                                    {errors.ifscCode && <span style={{ color: 'red', marginLeft: '70px' }}>{errors.ifscCode}</span>}
                                </label>
                                <label>
                                    Aadhar Number:
                                    <input className={styles.input} style={{ marginLeft: '0px' }} type="text" name="adharNumber" value={formData.adharNumber} onChange={handleChange} />
                                    {errors.adharNumber && <span style={{ color: 'red', marginLeft: '70px' }}>{errors.adharNumber}</span>}
                                </label><br/>
                                {responseError && <span style={{ color: 'red' }}>{responseError}</span>}

                            </div>
                        </div>


                        <div className={`col-md-6 }`}>
                            <div className={styles.rightSide}>
                                <label>
                                    Phone:
                                    <input className={styles.input} style={{ marginLeft: '70px' }} type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                                    {errors.phone && <span style={{ color: 'red', marginLeft: '70px' }}>{errors.phone}</span>}
                                </label>
                                <label>
                                    Adress:
                                    <input className={styles.input} style={{ marginLeft: '70px' }} type="tel" name="address" value={formData.address} onChange={handleChange} />
                                    {errors.address && <span style={{ color: 'red', marginLeft: '70px' }}>{errors.address}</span>}
                                </label>

                                <label>
                                    Photo:
                                    <input className={styles.input} style={{  marginLeft: '70px' }} type="file" name="photo" accept="image/*" onChange={handleImageChange} />
                                </label>
                                <label>
                                    Password:
                                    <input className={styles.input} style={{ marginLeft: '65px' }} type="password" name="password" value={formData.password} onChange={handleChange} />
                                    {errors.password && <span style={{ color: 'red', marginLeft: '70px' }}>{errors.password}</span>}
                                </label>
                                <label>
                                    Confirm Password:
                                    <input className={styles.input} type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                                    {errors.confirmPassword && <span style={{ color: 'red', marginLeft: '70px' }}>{errors.confirmPassword}</span>}
                                </label>



                                <button type="submit" className={styles.submitButton} >
                                    Sign Up
                                </button>
                                <p>Already have an account?
                                    <Link href="/signin">Sign In</Link></p>


                            </div>
                        </div> 
                    </div>


                </form>
            </div>
        </div>
    );
}
