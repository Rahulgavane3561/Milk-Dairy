"use client"

import { BsClipboardCheck, BsCreditCard, BsDropletHalf, BsHouseFill, BsPencilSquare, BsPower } from 'react-icons/bs';
import { Container, Nav } from 'react-bootstrap';

import Link from 'next/link';
import styles from './Sidebar.module.css'; // Import CSS module

const Sidebar = () => {
  const userProfile = {
    name: 'John Doe',
    profileImage: 'https://picsum.photos/200/300', // Replace with the actual image path
  };

  const menuItems = [
    { href: '#home', text: 'Home', icon: <BsHouseFill /> },
    { href: '#dashboard', text: 'Edit Profile', icon: <BsPencilSquare /> },
    { href: '#orders', text: 'My Orders', icon: <BsClipboardCheck /> },
    { href: '#customers', text: 'My Milk Supply', icon: <BsDropletHalf /> },
    { href: '#products', text: 'Bills and payment', icon: <BsCreditCard /> },
  ];
  

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logged out');
  };

  return (
    <Nav className={`flex-column ${styles.navMenu}`}>
      <div className={styles.userProfile}>
        <img src={userProfile.profileImage} alt="Profile" className={styles.profileImage} />
        <span className={styles.userName}>{userProfile.name}</span>
        <hr className={styles.divider} />
      </div>

      <ul className={styles.menuList}>
        {menuItems.map((item, index) => (
          <li key={index}>

            <span className={styles.navLink}>
              <Link href={item.href} className={styles.navItem}>
                <span className={styles.icon}>{item.icon}</span>
                <span>{item.text}</span>
              </Link>
            </span>

          </li>
        ))}
      </ul>

      <hr className={styles.divider} />

      <button className={styles.logoutButton} onClick={handleLogout}>
        <BsPower className={styles.logoutIcon} />
        Logout
      </button>
    </Nav>
  );
};

export default Sidebar;
