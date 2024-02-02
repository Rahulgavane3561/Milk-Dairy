"use client"

import React, { useEffect, useState } from 'react';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import Cookies from 'js-cookie';
import { FaExpandArrowsAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import styles from './Header.module.css';

function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    // Check the login status when the component mounts
    checkLoginStatus();
  }, []);
  // full screnn 
  const toggleFullScreen = () => {
    var element = document.documentElement;
  
    

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE11 */
      element.msRequestFullscreen();
    }
  }


  const checkLoginStatus = () => {
    const token = Cookies.get('token');

    if (!token) {
      // If token doesn't exist, show sign-in popup
      setIsLoggedIn(false);
    } else {
      // Show the payment modal
      setIsLoggedIn(true);
    }

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
        <i onClick={toggleFullScreen} style={{ color: 'white' }}>
          <FaExpandArrowsAlt size={20} />
        </i>


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
            <Link style={{ marginTop: '-7px' }} href="/feedback" passHref>
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
            <Link style={{ marginTop: '-7px' }} href="/signin" passHref>
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
