// AdminHeader.tsx

import React from 'react';

const AdminHeader: React.FC = () => {
  return (
    <header>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-start text-bg-dark" // Modified to move sidebar to the left
            style={{ width: '250px' }} // Increased width
            tabIndex={-1}
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header">
              <img
                src="/icons/person-icon.jpeg" // Add the image URL
                alt="Admin Logo"
                className="img-fluid rounded"
              />
              <hr className="bg-white mt-2 mb-2" />

            </div>
            <hr className="bg-white mt-2 mb-2" />
            <div>RahulG</div>
            <hr className="bg-white mt-2 mb-2" />
            <div className="offcanvas-body">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/admindashboard">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/admindashboard/Pages/Milk_data">
                    Milk data
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/admindashboard/Pages/Order_history">
                    Orders History
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/admindashboard/Pages/Bill_and_Payment">
                    Bill and Payment
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/admindashboard/Pages/Products">
                    Products
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    User Info
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li>
                      <a className="dropdown-item" href="../Pages/Supplier_details">
                        Supplier_details
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="../Pages/Milk_price">
                        MIlk price
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Send notification
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <form className="d-flex mt-3" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
          <a className="navbar-brand" href="#">
            Offcanvas dark navbar
          </a>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
