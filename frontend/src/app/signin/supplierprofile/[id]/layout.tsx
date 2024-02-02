"use client"

import './layout.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { FaHistory, FaSignOutAlt, FaUserCog } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import Sidebar from './Sidebar';
import { height } from '@fortawesome/free-solid-svg-icons/fa0';
import { useRouter } from 'next/navigation';

const Layout: React.FC = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust breakpoint as needed
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Call initially to set initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logOut = () => {
    Cookies.remove("token");
    router.push('/signin');
  }

  return (
    <div className={`layout-container ${isSmallScreen ? 'small-screen' : ''}`}>
      <nav className="sb-topnav position-fixed top-60 w-100  navbar navbar-expand navbar-dark bg-dark" style={{ zIndex: '8', backgroundColor: '#161a35' }}>
        {/* <!-- Navbar Brand--> */}
        <a className="navbar-brand " href="index.html">Welcome to Dashboard</a>
        {/* <!-- Sidebar Toggle--> */}
        {isSmallScreen && (<button onClick={toggleSidebar} className="btn btn-link btn-sm order-1 order-md-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>)}
        {/* <!-- Navbar Search--> */}
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div className="input-group">
            <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
            <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
          </div>
        </form>
        {/* <!-- Navbar--> */}
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="#!"><FaUserCog /> Settings</a></li>
              <li><a className="dropdown-item" href="#!"><FaHistory />Activity Log</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li ><a className="dropdown-item" href="#!" onClick={logOut}><FaSignOutAlt /> Logout</a></li>
            </ul>
          </li>
        </ul>
      </nav>
      
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <Sidebar />
      </div>
      <main
        style={{ zIndex: '1', position: 'relative' }} // Set position to relative
        className={`main-content ${isSmallScreen && !isSidebarOpen ? 'small-screen' : ''}`}
      >


        {children}
        {isSidebarOpen && isSmallScreen && (
          <div
            className="overlay"
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(87, 80, 80, 0.3)', // Adjust the color and opacity as needed
            }}
          />
        )}
      </main>
    </div>
  );
};

export default Layout;