"use client"

import React, { useState } from 'react';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import styles from './Header.module.css';

function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <>
      <nav className={styles.nav}>
        <label htmlFor="check" className={styles.checkbtn}>
          <FontAwesomeIcon icon={toggleMenu ? faTimes : faBars} onClick={handleToggle} />
        </label>
        <Link href="/" passHref>
          <span className={styles.logo}>
            <img src="/logoa.png" alt="Nexus Logo" className={styles.logoImg} />
            <p style={{ color: 'red' }}></p>
          </span>
        </Link>

        <ul className={`${styles.menu} ${toggleMenu ? styles.active : ''} ${styles.center}`}>
          <li>
            <Link href="/" passHref>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" passHref>
              About
            </Link>
          </li>
          <li>
            <Link href="/products" passHref>
              Products
            </Link>
          </li>
          <li>
            <Link href="/contact_us" passHref>
              Contact
            </Link>
          </li>
          <li>
            <Link style={{marginTop:'-7px'}}  href="/feedback" passHref>
              Feedback
            </Link>
          </li>
        </ul>

        <ul className={`${styles.menu} ${styles.right}`}>
          <li>
            <Link href="/signup" passHref>
              Signup
            </Link>
          </li>
        
          <li>
            <Link style={{marginTop:'-7px'}} href="/signin" passHref>
              Signin
            </Link>
          </li>
        </ul>
      </nav>
      <section></section>
    </>
  );
}

export default Header;
