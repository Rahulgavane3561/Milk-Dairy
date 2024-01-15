"use client"

import { FaArrowRight, FaEnvelope, FaKey, FaLock } from 'react-icons/fa';

import Styles from './forgot_password.module.css';
import axios from 'axios';
import { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleEmailSubmit = async () => {
    try {
      // Simulating login by setting loggedIn to true
      setLoggedIn(true);
      setStep(2); // Move to OTP verification step
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      // Your code to verify OTP
      setStep(3); // Move to password reset step
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  const handlePasswordReset = async () => {
    try {
      // Your code to reset password
      setStep(1); // Go back to step 1 after password reset
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <div className={Styles.forgot_password_container}>
      {!loggedIn && (
        <div className={Styles.form_container}>
          <FaEnvelope className={Styles.icon} />
          <input
            className={Styles.pass_input}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={Styles.pass_button} onClick={handleEmailSubmit}>
            Next <FaArrowRight className={Styles.arrow_icon} />
          </button>
        </div>
      )}

      {loggedIn && step === 2 && (
        <div className="form-container">
          <FaKey className="icon" />
          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button onClick={handleOtpSubmit}>
            Verify OTP <FaArrowRight className="arrow-icon" />
          </button>
        </div>
      )}

      {loggedIn && step === 3 && (
        <div className="form-container">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handlePasswordReset}>
            Save Changes <FaArrowRight className="arrow_icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
