// src/components/AdminLayout.tsx

import AFooter from './components/adminFooter';
import Head from 'next/head'
import Header from './components/adminHeader';
import React from 'react';
import Sidebar from './components/adminSidebar'

const AdminLayout: React.FC = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        {/* Include any admin-specific head elements if needed */}
      </Head>
      <body>
        <Header />
        <div style={{ height: '60px' }}></div>
        {children}
        {/* <AFooter/> */}
      </body>
    </html>
  );
};

export default AdminLayout;
