"use client"

import React, { useEffect, useRef, useState } from 'react';

import Cookies from 'js-cookie';
import axios from 'axios';
import styles from './c_home.module.css'
import { useRouter } from 'next/navigation';

const Page = () => {
  const isAuthenticated = Cookies.get('isAuthenticated');
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login page or show an error page
      router.push('/milkcollection/signin');
    }
  }, [isAuthenticated]);
  const router = useRouter();
  const [formData, setFormData] = useState({
    fat_content: '',
    supplierId: '',
    quantityInLtr: '',
  });
  const [milkData, setMilkData] = useState([]);
  const [aggregateValues, setAggregateValues] = useState({});
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const supplierIdRef = useRef(null);
  const fatContentRef = useRef(null);
  const quantityInLtrRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter') {
      // Move focus to the next input field on down arrow key press
      switch (e.target.name) {
        case 'supplierId':
          fatContentRef.current.focus();
          break;
        case 'fat_content':
          quantityInLtrRef.current.focus();
          break;
        default:
          break;
      }
    } else if (e.key === 'ArrowUp') {
      // Move focus to the previous input field on up arrow key press
      switch (e.target.name) {
        case 'quantityInLtr':
          fatContentRef.current.focus();
          break;
        case 'fat_content':
          supplierIdRef.current.focus();
          break;
        default:
          break;
      }
    } else if (e.key === 'Enter') {
      // Trigger calculate price on Enter key press
      handleCalculatePrice();
    }
  };

  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [supplierName, setSupplierName] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (formSubmitted) {
      if (!formData.fat_content || isNaN(formData.fat_content) || formData.fat_content < 3.1 || formData.fat_content > 12) {
        newErrors.fat_content = 'Enter a valid fat content between 3.1 and 12';
      }
      if (!formData.supplierId.trim()) {
        newErrors.supplierId = 'Supplier ID is required';
      }
      if (!formData.quantityInLtr || isNaN(formData.quantityInLtr)) {
        newErrors.quantityInLtr = 'Enter a valid quantity in liters';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCalculatePrice = async () => {
    setFormSubmitted(true); // Set the flag to true on clicking "Calculate Price"
    if (!formData.fat_content || !formData.supplierId || !formData.quantityInLtr) {
      return;
    }
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8086/api/supplier/getfatprice', {
          fat_content: formData.fat_content,
          supplierId: formData.supplierId,
        });

        const { price, supplierName, error } = response.data;

        if (error) {
          // Handle supplier not found or other errors
          setErrors({ ...errors, supplierId: error });
          setResult(null);
          setSupplierName(''); // Clear supplier name if there is an error
        } else {
          setErrors({});
          const totalPrice = price * formData.quantityInLtr;
          setResult(totalPrice);
          setSupplierName(supplierName); // Set supplier name from the response
        }
      } catch (error) {
        console.error('Error calculating price:', error);
      }
    }
  };

  const handleSaveData = async () => {
    setFormSubmitted(true); // Set the flag to true on clicking "Save"
    if (validateForm()) {
      try {
        const dataToSave = { ...formData, totalAmount: result };
        const response = await axios.post('http://localhost:8086/api/supplier/addmilk', dataToSave);

        const { error } = response.data;

        if (error) {
          // Handle supplier not found or other errors
          setErrors({ ...errors, supplierId: error });
          setResult(null);
          setSupplierName(''); // Clear supplier name if there is an error
        } else {
          setErrors({});
          setShowSuccessNotification(true);

          // Hide the success notification after 6 seconds
          setTimeout(() => {
            setShowSuccessNotification(false);
          }, 3000);

          window.location.reload();
        }
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  };


  const fetchMilkData = async () => {
    try {
      const response = await axios.post('http://localhost:8086/api/collection/getmilkdata');
      const { rows, aggregateValues } = response.data;
      setMilkData(rows);
      setAggregateValues(aggregateValues);
    } catch (error) {
      console.error('Error fetching milk data:', error);
    }
  };
  const [responseMessage, setResponseMessage] = useState('');
  const handleRemoveRow = async (collection_id) => {
    try {
      const response = await axios.post('http://localhost:8086/api/collection/deletemilkData', { collection_id });

      if (response.data.success) {
        fetchMilkData();

        setResponseMessage(response.data.message);

        // Clear the response message after 4 seconds
        setTimeout(() => {
          setResponseMessage('');
        }, 4000);
      } else {
        console.error('Error deleting data:', response.data.error);
      }
    } catch (error) {
      console.error('Error removing row:', error);
    }
  };

  // ====================================pop up box============================
  const [previousData, setPreviousData] = useState([]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getPreviousData = async () => {
    try {
      const response = await axios.post('http://localhost:8086/api/collection/getpriviousdata');
      const { rows } = response.data;
      setPreviousData(rows); // Assuming the API response contains an array of data
      openModal();
    } catch (error) {
      console.error('Error fetching previous data:', error);
    };
  }
  useEffect(() => {
    supplierIdRef.current.focus();
    fetchMilkData();
  }, []);
  useEffect(() => {
    validateForm();
    handleCalculatePrice();
  }, [formData]);

// ===============================logout function
const handleLogout = () => {

  Cookies.remove('isAuthenticated');

  router.push('/milkcollection/signin'); 
};


  return (
    <>
      {showSuccessNotification && (
        <div className={`${styles.successNotification} row`}>
          <div className="col-md-11">
            <p>Data saved successfully!</p>
          </div>
          <div className="col-md-1">
            <button className={styles.closeButton} onClick={() => setShowSuccessNotification(false)}>
              X
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        // Overlay for the entire page when the modal is open
        <div className={styles.overlay}></div>
      )}

      <div className={`container ${styles.containerFuild} mt-2`}>
        <div className={`row ${styles.row}`}>
          <div className={`mb-3 col-md-6 ${styles.mformContainer}`}>
            <div className={styles.formContainer}>
              <h5>
                      <button className={styles.button} onClick={handleLogout}>Logout</button></h5>
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="supplierId" className="form-label">Supplier ID</label>
                    <input
                      type="text"
                      className={`form-control ${styles.forminput} ${errors.supplierId ? 'is-invalid' : ''}`}
                      id="supplierId"
                      name="supplierId"
                      value={formData.supplierId}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      ref={supplierIdRef}
                      placeholder="Enter Supplier ID"
                    />
                    {errors.supplierId && <div className="invalid-feedback">{errors.supplierId}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="fat_content" className="form-label">Fat Content</label>
                    <input
                      type="text"
                      className={`form-control ${styles.forminput} ${errors.fat_content ? 'is-invalid' : ''}`}
                      id="fat_content"
                      name="fat_content"
                      value={formData.fat_content}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      ref={fatContentRef}
                      placeholder="Enter Fat Content"
                    />
                    {errors.fat_content && <div className="invalid-feedback">{errors.fat_content}</div>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="quantityInLtr" className="form-label">Quantity in Ltr</label>
                    <input
                      type="text"
                      className={`form-control ${styles.forminput} ${errors.quantityInLtr ? 'is-invalid' : ''}`}
                      id="quantityInLtr"
                      name="quantityInLtr"
                      value={formData.quantityInLtr}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      ref={quantityInLtrRef}
                      placeholder="Enter Quantity in Liters"
                    />
                    {errors.quantityInLtr && <div className="invalid-feedback">{errors.quantityInLtr}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="quantityInLtr" className="form-label">Quantity in Ltr</label>
                    <input
                      type="text"
                      className={`form-control ${styles.forminput} ${errors.quantityInLtr ? 'is-invalid' : ''}`}
                      id="quantityInLtr"
                      name="quantityInLtr"
                      value={formData.quantityInLtr}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      ref={quantityInLtrRef}
                      placeholder="Enter Quantity in Liters"
                      disabled
                    />
                    {/* {errors.quantityInLtr && <div className="invalid-feedback">{errors.quantityInLtr}</div>} */}
                  </div>
                </div>
                <button type="button" className={`btn btn-primary ${styles.calculateButton}`} onClick={handleCalculatePrice}>
                  Calculate Price
                </button>
              </form>
            </div>
          </div>

          <div className={`col-md-6 ${styles.rightSide}`}>
            <div className={styles.rightmain}>
              {result !== null ? (
                <div className={`${styles.resultContainer} mt-4`}>
                  {supplierName && <p> <span className={styles.label}>Name:</span> {supplierName}</p>}
                  <p>
                    <span className={styles.label}>Fat Content:</span> {formData.fat_content}
                  </p>
                  <p>
                    <span className={styles.label}>Quantity:</span> {formData.quantityInLtr}
                  </p>
                  <h6>
                    <span className={styles.label}>Total Price:</span> ${result}
                  </h6>
                  <button type="button" className={`btn btn-success ${styles.saveButton}`} onClick={handleSaveData}>
                    Save
                  </button>
                </div>
              ) : (
                // Display static content when input fields are not filled
                <div className={`${styles.resultContainer} `}>
                  <div className={styles.rightfefalut}>
                    <hr />
                    <div className={styles.header}>
                      <h5><strong>Today collection Data</strong></h5>
                      <button className={styles.button} onClick={getPreviousData}>Get Previous</button>
                    </div>
                    <hr />
                    {aggregateValues ? (
                      <>
                        <p><span className={styles.labela}>Date </span><span className={styles.labela}>:</span>{aggregateValues.todayDate} </p>
                        <p><span className={styles.labela}>Quantity</span> <span className={styles.labela}>:</span>{aggregateValues.totalQuantity}</p>
                        <p> <span className={styles.labela}>Amount</span> <span className={styles.labela}>:</span>{aggregateValues.totalAmount}</p>
                        <p> <span className={styles.labela}>Avg fat</span> <span className={styles.labela}>:</span>{aggregateValues.averageFatContent}</p>
                        {/* <hr /> */}
                        <p> <span className={styles.labela}>number</span><span className={styles.labela}>:</span>{aggregateValues.numberOfRows}</p>
                      </>
                    ) : (
                      <button style={{ background: 'transparent', border: '1px solid black', color: 'black' }}>
                        No values found
                      </button>
                    )}
                  </div>
                </div>

              )}
            </div>
          </div>
        </div>
        <hr style={{ height: '4px', backgroundColor: '#FF8C00', margin: '10px 0' }} />
        {/* ===================================================================================== */}
        <div className={`modal fade ${isModalOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isModalOpen ? 'block' : 'none' }}>
          <div className="modal-dialog modal-lg" style={{ maxWidth: '80%', marginTop: '5%' }}>
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: '#007BFF', color: 'white' }}>
                <h5 className="modal-title">Previous Data</h5>
                <button type="button" className="btn-close" onClick={closeModal} style={{ color: 'white' }}></button>
              </div>
              <div className="modal-body">
                {previousData.length > 0 ? (
                  <table className="table table-bordered" style={{ backgroundColor: '#f5f5f5' }}>
                    <thead style={{ backgroundColor: '#007BFF', color: 'white' }}>
                      <tr>
                        <th>Date</th>
                        <th>Total Quantity</th>
                        <th>Total Amount</th>
                        <th>Average Fat Content</th>
                        <th>Number of suppliers</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previousData.map((data, index) => (
                        <tr key={index}>
                          <td>{new Date(data.collected_date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' }).replace(/\//g, '-')}</td>
                          <td>{data.total_quantity}</td>
                          <td>{data.total_amount}</td>
                          <td>{data.average_fat_content}</td>
                          <td>{data.number_of_rows}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No previous data available</p>
                )}
              </div>
            </div>
          </div>
        </div>



        <div className="row" >
          {responseMessage && (
            <div className={styles.responseMessage}>
              {responseMessage}
            </div>
          )}
          {milkData.length === 0 ? (
            <div className="text-center mt-4">
              <p>No data available</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Supplier Name</th>
                  <th>Fat Content</th>
                  <th>Quantity (Liter)</th>
                  <th>Collection Time</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {milkData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.name}</td>
                    {/* <td>{new Date(row.collected_date).toLocaleDateString('en-GB').replace(/\//g, '-')}</td> */}
                    <td>{row.fat_content}</td>
                    <td>{row.quantity_liter}</td>
                    <td>{row.collection_time}</td>
                    <td>{row.amount}</td>
                    <td><button className={` ${styles.removeButton}`}
                      onClick={() => handleRemoveRow(row.collection_id)}>
                      Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );

};

export default Page;
