"use client"

import { FaArrowRight, FaEnvelope, FaKey, FaLock } from 'react-icons/fa';

import Styles from './forgot_password.module.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const handleEmailSubmit = async () => {
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError('Invalid email address.');
        return;
      }
      // Clear any previous error
      setEmailError('');
      const response = await axios.post('http://localhost:8086/api/supplier/fp_email', { email });
      if (response.data.status === 'exists') {
        // Email verification successful, proceed to the next step
        setLoggedIn(true);
        setStep(2); // Move to OTP verification step
      }
      if (response.data.status === 'not-found')
      {
        setEmailError('Email not found. Please enter a valid email address.');
      } else {
        // Email verification failed, handle accordingly
        setEmailError('Email verification failed.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };


  const handleOtpSubmit = async () => {
    try {
      // Validate OTP format (assuming 6 digits)
      const otpRegex = /^\d{6}$/;
      if (!otpRegex.test(otp)) {
        setOtpError('Invalid OTP format.');
        return;
      }

      // Clear any previous error
      setOtpError('');
      const response = await axios.post('http://localhost:8086/api/supplier/fp_otp', { email, otp });

      // Your code to verify OTP
      if (response.data.status === 'success') {
        // OTP verification successful, proceed to the next step
        setStep(3); // Move to password reset step
      }
      if (response.data.status === 'invalid-otp') {
        setOtpError('Invalid otp');
      }  else {
        // OTP verification failed, handle accordingly
        setOtpError('OTP verification failed.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  const handlePasswordReset = async () => {
    try {
      // Check if the entered password and confirm password match
      if (password !== confirmPassword) {
        setPasswordMatchError('Password and Confirm Password should be match.');
        return;
      }

      // Validate password length (minimum 6 characters)
      if (password.length < 6) {
        setPasswordError('Password should be at least 6 characters.');
        return;
      }

      // Clear any previous error
      setPasswordMatchError('');
      setPasswordError('');

      const response = await axios.post('http://localhost:8086/api/supplier/fp_password', {
        email,
        password,
      });
      if (response.data.status === 'success') {
        // Password reset successful, redirect to /signin
        router.push('/signin');
      } else {
        // Password reset failed, handle accordingly
        console.error('Password reset failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <div className={Styles.forgot_password_container}>
      {!loggedIn && (
        <div className={Styles.form_container}>
          {emailError && (
            <p className={`text-danger ${Styles.errorText}`}>{emailError}</p>
          )}
          <FaEnvelope className={Styles.icon} />
          <h2 className={Styles.title}>Enter your email</h2>
          <p className={Styles.description}>
            We'll send you a OTP to reset your password. Please make sure you enter the correct email address.
          </p>
          <input
            className={Styles.pass_input}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);

              // Validate email format on input change
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(e.target.value)) {
                setEmailError('Invalid email address.');
              } else {
                setEmailError('');
              }
            }}
          />
          <button className={Styles.pass_button} onClick={handleEmailSubmit}>
            Next <FaArrowRight className={Styles.arrow_icon} />
          </button>
        </div>
      )}

      {loggedIn && step === 2 && (
        <div className={Styles.verify_container}>
          {otpError && (
            <p className={`text-danger ${Styles.errorText}`}>{otpError}</p>
          )}
          <FaKey className={Styles.icon} />
          <h2 className={Styles.title}>Verify your identity</h2>
          <p className={Styles.description}>
            We've sent an OTP to your email. Please enter the OTP below to verify your identity.
          </p>
          <input type="text" placeholder="Enter OTP" value={otp}
            onChange={(e) => {
              setOtp(e.target.value);

              // Validate OTP format (assuming 6 digits)
              const otpRegex = /^\d{6}$/;
              if (!otpRegex.test(e.target.value)) {
                setOtpError('Invalid OTP format.');
              } else {
                setOtpError('');
              }
            }}
          />
          <button className={Styles.pas_button} onClick={handleOtpSubmit}>
            Verify OTP <FaArrowRight className="arrow-icon" />
          </button>
        </div>
      )}

      {loggedIn && step === 3 && (
        <div className={Styles.reset_container}>
          {passwordMatchError && (
            <p className={`text-danger ${Styles.errorText}`}>{passwordMatchError}</p>
          )}
          {passwordError && (
            <p className={`text-danger ${Styles.errorText}`}>{passwordError}</p>
          )}
          <FaLock className={Styles.icon} />
          <h2 className={Styles.title}>Reset your password</h2>
          <p className={Styles.description}>
            Please enter a new password. Make sure your password is strong and secure.
          </p>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);

              // Validate password length
              if (e.target.value.length < 6) {
                setPasswordError('Password should be at least 6 characters.');
              } else {
                setPasswordError('');
              }

            }}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);

              // Check if the entered password and confirm password match
              if (password !== e.target.value) {
                setPasswordMatchError('Password and Confirm Password should match.');
              } else {
                setPasswordMatchError('');
              }
            }}
          />
          <button className={Styles.pas_button} onClick={handlePasswordReset}>
            Save Changes <FaArrowRight className="arrow_icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
