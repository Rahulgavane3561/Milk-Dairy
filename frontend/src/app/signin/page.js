// pages/login.js
"use client"

import React from 'react';
import styles from './signin.module.css';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();

  const nav = () => {
    router.push('/');
  }


  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm}>
        <h2 className={styles.formTitle}>Login</h2>
        <button onClick={nav}>Button</button>
        <div className="form-group">
          <label className={styles.formLabel} htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className={`form-control ${styles.formInput}`}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label className={styles.formLabel} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`form-control ${styles.formInput}`}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className={`btn btn-primary ${styles.formButton}`}>
          Login
        </button>
        <p className="mt-3 text-center">
          New user ?  <a href="/signup">Create an account</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
