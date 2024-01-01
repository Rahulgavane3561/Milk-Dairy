"use client"

import 'bootstrap/dist/css/bootstrap.min.css';

import { faHome, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'; // Import desired icons
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Assuming you're using Font Awesome for icons
import Home from './components/profile/page';
import { Image } from 'react-bootstrap'; // Import React Bootstrap components as needed
import Link from 'next/link';
import Orders from './components/orders/page';
import Profile from './components/history/page';
import styles from './suppierprofilr.module.css'; // Replace with the correct path

const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState<'home' | 'orders' | 'profile'>('home');
  const [sidebarActive, setSidebarActive] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleComponentChange = (component: 'home' | 'orders' | 'profile') => {
    setSelectedComponent(component);
    setSidebarActive(false); // Hide sidebar when a link is clicked
  };

  const handleSidebarToggle = () => {
    setSidebarActive(!sidebarActive);
  };

  const closeSidebar = () => {
    setSidebarActive(false);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)'); // Change the breakpoint as needed
    const handleMediaQueryChange = (e) => {
      if (e.matches) {
        setIsSmallScreen(true);
        setSidebarActive(false); // Hide sidebar on smaller screens by default
      } else {
        setIsSmallScreen(false);
        setSidebarActive(true); // Show sidebar on larger screens by default
      }
    };

    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery); // Initial check

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  return (
    <div className={styles.adminContainer}>
      {isSmallScreen && (
        <div className={styles.toggleIcon} onClick={handleSidebarToggle}>
          {sidebarActive ? '✕' : '☰'}
        </div>
      )}
      <div className={sidebarActive ? `${styles.adminSidebar} ${styles.active}` : styles.adminSidebar}>
        <h2>Admin Details</h2>

        <ul className={styles.list}>
          <li onClick={() => handleComponentChange('home')}>
            <a>
              <FontAwesomeIcon icon={faHome} /> Home
            </a>
          </li>
          <li onClick={() => handleComponentChange('orders')}>
            <a>
              <FontAwesomeIcon icon={faShoppingCart} /> Orders
            </a>
          </li>
          <li onClick={() => handleComponentChange('profile')}>
            <a>
              <FontAwesomeIcon icon={faUser} /> Profile
            </a>
          </li>
        </ul>
        <div className="d-flex justify-content-between align-items-end p-3" style={{ position: 'absolute', bottom: 0, width: '100%',left:'20px' }}>
          <div className="d-flex align-items-center">
            {/* Random profile image */}
            <Image
              src={`https://picsum.photos/50/50?random=${Math.floor(Math.random() * 100)}`}
              alt='Loading....'
              roundedCircle
              className="mr-2"
            />
            <span style={{marginLeft:'25px'}}>John Doe</span>
          </div>
        </div>
      </div>
      <div className={styles.adminContent}>
        {selectedComponent === 'home' && <Home />}
        {selectedComponent === 'orders' && <Orders />}
        {selectedComponent === 'profile' && <Profile />}
      </div>


    </div>
  );
};

export default Admin;
