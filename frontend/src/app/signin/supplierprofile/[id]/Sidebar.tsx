"use client"

import { BsClipboardCheck, BsCreditCard, BsDropletHalf, BsHouseFill, BsPencilSquare, BsPower } from 'react-icons/bs';
import { Container, Nav } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import Link from 'next/link';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import styles from './Sidebar.module.css'; // Import CSS module
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter()
  const [menuItems, setMenuItems] = useState([]);
  let userId = null;
  const [userProfile, setUserProfile] = useState({
    name: '',
    profileImage: '',
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
    const token = Cookies.get('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      const response = await axios.get(`http://localhost:8086/api/supplie/getusername/${userId}`);
      const userData = await response.data;

      
      setUserProfile({
        name: userData.name,
        profileImage:  `/Eimages/${userData.profileImage}`,
        profileImage: userData.profileImage ? `/Eimages/${userData.profileImage}` : '/icons/person-icon.jpeg',
      });

           const generatedMenuItems = [
        { href: `/signin/supplierprofile/${userId}/`, text: 'Home', icon: <BsHouseFill /> },
        { href: `/signin/supplierprofile/${userId}/components/Edit_profile`, text: 'Edit Profile', icon: <BsPencilSquare /> },
        { href: `/signin/supplierprofile/${userId}/components/My_orders`, text: 'My Orders', icon: <BsClipboardCheck /> },
        { href: `/signin/supplierprofile/${userId}/components/Milk_supplied`, text: 'My Milk Supply', icon: <BsDropletHalf /> },
        { href: `/signin/supplierprofile/${userId}/components/Payment`, text: 'Bills and payment', icon: <BsCreditCard /> },
      ];

      setMenuItems(generatedMenuItems);


    } else {
      // Handle the case when token doesn't exist or user is not authenticated
      router.push('/signin'); // Redirect to the sign-in page
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Handle error as needed
  }
};
fetchData(); 
    return () => {
      console.log('Sidebar component will unmount'); // Log when the component will unmount
    };

  }, []);



  // const userProfile = {
  //   name: 'Rahul',
  //   profileImage: '/backa.jpg', // Replace with the actual image path
  // };
  const logOut = () => {
    Cookies.remove("token");
    router.push('/signin')

  }

  const handleNavigation = (href) => {
    router.push(href); // Function to handle navigation using router.push
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

            <span
              className={styles.navLink}
              onClick={() => handleNavigation(item.href)} // Handling navigation onClick
            >
              <span className={styles.icon}>{item.icon}</span>
              <span>{item.text}</span>
            </span>

          </li>
        ))}
      </ul>

      <hr className={styles.divider} />

      <button className={styles.logoutButton} onClick={logOut}>
        <BsPower className={styles.logoutIcon} />
        Logout
      </button>
    </Nav>
  );
};

export default Sidebar;
