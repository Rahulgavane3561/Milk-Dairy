// pages/login.js
"use client"

import './signin.css';

import React, { useState } from 'react';

import Cookies from 'js-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post('http://localhost:8086/api/supplier/supplier_login', { email, password, });
      console.log('Login successful!', response.data);
      const token = response.data.token;

      Cookies.set('token', token, { expires: 1 / 24 });
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      alert(userId);

      router.push(`signin/supplierprofile/${userId}/`);

    } catch (error) {
      console.error('Login failed!', error);

    }
  };
 
  return (
    <div className="container login-container  p-3">
      <div className="d-flex justify-content-center h-100">
        <div className="card login-card">
          <div className="card-header login-card-header">
            <h3>Sign In</h3>

          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-user"></i></span>
                </div>
                <input type="text" className="input form-control" placeholder="email" onChange={(e) => setEmail(e.target.value)} />

              </div>
              <div className="input-group form-group mt-4">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-key"></i></span>
                </div>
                <input type="password" className=" input form-control" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="d-flex ">
                <a className='text-white' href="#">Forgot your password?</a>
              </div>
              <div className="row align-items-center remember mt-2">
                <input className='input' type="checkbox" />Remember Me
              </div>
              <div className="form-group mt-3 ">
                <input type="submit" value="Login" className="input btn float-right login_btn" />
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center ">
              Don't have an account?<a href="../signup" className='text-white'>Sign Up</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
