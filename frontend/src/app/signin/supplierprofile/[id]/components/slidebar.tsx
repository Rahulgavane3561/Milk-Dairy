// components/Sidebar.js
"use client"

import Link from 'next/link';
import React from 'react';

function Sidebar({ user, onLogout }) {
  return (
    <div className="sidebar">
      <div className="user-profile">
        <img src='/frontend/Simages/image_1702408962104.jpg' alt="User" />
        <h3>{user.name}</h3>
      </div>
      <ul>
        <li>
          <Link href="/profile">
            Profile
          </Link>
        </li>
        <li>
          <Link href="/orders">
            Orders
          </Link>
        </li>
       
      </ul>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Sidebar;
