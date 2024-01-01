"use client"

import Sidebar from './Slidebar';

const Layout: React.FC = ({ children }) => {
  return (
    <div  style={{display:'flex', flexDirection:'row'}}>
      <Sidebar  />
      <main >{children}</main>
    </div>
  );
};

export default Layout;
