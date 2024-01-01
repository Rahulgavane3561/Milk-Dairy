"use client"

import 'bootstrap/dist/css/bootstrap.min.css';

import { Alert, Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './signin.module.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setBackendError('Invalid email or password. Please try again.');

  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles['login-container']} style={{ backgroundImage: `url('/background-image.jpg')` }}>
      <div className={`${styles['login-form']} border-3 border-primary rounded shadow`}>
        <h2 className={styles['form-title']}>Login</h2>
        {backendError && <Alert variant="danger">{backendError}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label className={styles['form-label']}>Email address</Form.Label>
            <Form.Control className={styles['form-input']} type="email" placeholder="Enter email" required />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label className={styles['form-label']}>Password</Form.Label>
            <div className={`input-group ${styles['form-input']}`}>
              <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Password" required />
              <div className="input-group-append">
                <Button variant="light" onClick={togglePasswordVisibility}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </Button>
              </div>
            </div>
          </Form.Group>
          <Button className={`${styles['form-button']} w-100`} variant="primary" type="submit">
            Login
          </Button>
          <p className="mt-3 text-center">
            Not registered? <a href="/signup">Create an account</a>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
