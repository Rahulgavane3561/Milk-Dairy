"use client"

import "./sy.css"

import { FaCalendarAlt, FaDollarSign, FaEnvelope, FaExclamationCircle, FaGlassWhiskey, FaIdCard, FaMoneyBillAlt, FaMoneyCheckAlt, FaPhone, FaShoppingCart, FaTint, FaUser } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import Graph from './graph'
import Image from 'next/image'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import styles from "./supplerprofile.module.css"

function page() {

  const dataa = [ 
    { time: 1, amount: 10 },
    { time: 2, amount: 20 },
    { time: 3, amount: 15 },
    { time: 4, amount: 25 },
    { time: 5, amount: 30 },
    // ... (more data)
  ];

  // const [collectionData, setCollectionData] = useState(null);
  // const [supplierId, setsupplierId] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const supplierId = decodedToken.id;
    const fetchCollectionData = async () => {
      try {
        console.log('Fetching data...');
        console.log(supplierId);
        const response = await axios.get(`http://localhost:8086/api/supplie/milk-collection/${supplierId}`);
        console.log(response);  // Log the response to inspect its structure
        const jsonData = await response.data;
        setData(jsonData);

      } catch (error) {
        console.error('Error fetching milk collection data:', error);
      }
    };

    fetchCollectionData();
    setCurrentDate(new Date());
  }, []);


  if (!data) {
    return <p>Error fetching data</p>;
  }

  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();

    return `${month}-${day}`;
  };

  const getWeekRange = () => {
    const dayOfMonth = currentDate.getDate();
    let weekStart, weekEnd;

    if (dayOfMonth <= 10) {
      weekStart = 1;
      weekEnd = 10;
    } else if (dayOfMonth <= 20) {
      weekStart = 11;
      weekEnd = 20;
    } else {
      weekStart = 21;
      // Adjust weekEnd based on the actual number of days in the month
      weekEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    }

    return `${weekStart} to ${weekEnd}`;
  };

  const decimalToPercentage = (decimalValue) => {
    // Ensure the value is between 1 and 100
    const clampedValue = Math.min(Math.max(decimalValue, 1), 100);
    // Multiply by 10 to convert to percentage without decimal
    return `${(clampedValue * 10).toFixed(0)}%`;
  };




  return (
    <div className={styles.main}>

      <div className='p-4'>
        <h1 className="mt-4" >Dashboard</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">current week status</li>
        </ol>


        <div className="row z-index-1">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">    <FaGlassWhiskey /> supplied milk</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <span className="small text-white stretched-link" href="#">{data.recentMilkCollections.totalQuantity}ltr</span>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">    <FaTint />Avg Fat content</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <span className="small text-white stretched-link" href="#">{data.recentMilkCollections.avgFatContent}</span>

              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">  <FaDollarSign />amount</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <span className="small text-white stretched-link" href="#">{data.recentMilkCollections.totalAmount}</span>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 ">
            <div className="card bg-danger text-white mb-4">
              <div className="card-body">
                <FaCalendarAlt /> Year {currentDate.getFullYear()} {getFormattedDate(currentDate)}
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">

                <span className="small text-white stretched-link" href="#">
                  Week {getWeekRange()}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-6">
            <div className="card mb-4">
              <div className="card-header">
                <i className="fas fa-chart-area me-1"></i>
                Area Chart Example
              </div>
              <div className="card-body"><canvas id="myAreaChart" width="100%" height="40"></canvas></div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card mb-4">
              <div className="card-header">
                <i className="fas fa-chart-bar me-1"></i>
                Bar Chart Example
              </div>
              <div className="card-body"><canvas id="myBarChart" width="100%" height="40"></canvas></div>
            </div>
          </div>
        </div>
        <div className="main-body">
          <div className="page-wrapper">
            {/*Page-body start */}
            <div className="page-body">
              <div className="row">
                {/*Material statustic card start */}
                <div className="col-xl-6 col-md-12">
                  <div className="card mat-stat-card">
                    <div className="card-block">
                      <div className="row align-items-center b-b-default">
                        <div className="col-sm-6 b-r-default p-b-20 p-t-20">
                          <div className="row align-items-center text-center">
                            <div className="col-4 p-0">
                              <FaMoneyBillAlt />
                            </div>
                            <div className="col-8 p-0">
                              <h5>{data.advanceDetails.totalAdvanceAmount}</h5>
                              <p className="text-muted m-b-0">Advance</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 p-b-20 p-t-20">
                          <div className="row align-items-center text-center">
                            <div className="col-4 p-r-0">
                              <FaMoneyCheckAlt />
                            </div>
                            <div className="col-8 p-l-0">
                              <h5>{data.advanceDetails.pendingAmount}</h5>
                              <p className="text-muted m-b-0">pending</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-sm-6 p-b-20 p-t-20 b-r-default">
                          <div className="row align-items-center text-center">
                            <div className="col-4 p-r-0">
                              <FaShoppingCart />
                            </div>
                            <div className="col-8 p-l-0">
                              <h5>2000</h5>
                              <p className="text-muted m-b-0">feed cost</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 p-b-20 p-t-20">
                          <div className="row align-items-center text-center">
                            <div className="col-4 p-r-0">
                              <FaExclamationCircle />
                            </div>
                            <div className="col-8 p-l-0">
                              <h5>20</h5>
                              <p className="text-muted m-b-0">pending</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 col-md-12">
                  <div className={`${styles.card} ${styles.green}`}>
                    <div className="card-block">
                      <div className="row">
                        <div className="col-3 text-center bg-c-green">
                          <i className="fas fa-star mat-icon f-24"></i>
                        </div>
                        <div className="col-9 cst-cont">
                          <h5>silver level</h5>
                          <p className="m-b-0"> 4 ratings got</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.card} ${styles.blue}`}>
                    <div className="card-block">
                      <div className="row">
                        <div className="col-3 text-center bg-c-blue">
                          <i className="fas fa-trophy mat-icon f-24"></i>
                        </div>
                        <div className="col-9 cst-cont">
                          <h5>0</h5>
                          <p className="m-b-0">Achievements</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="row mt-3" >
                <div className="col-xl-6 col-md-12">
                  <div className="card table-card border-0">
                    <div className="card-header">
                      <h5>Profile Details</h5>

                    </div>
                    <div className="card-block">
                      <div className="table-responsive">
                        <table className="table table-hover m-b-0 without-header">
                          <tbody>
                            <tr>
                              <td>
                                <div className="d-inline-block align-middle">
                                  <span className="icon-container"><FaUser /></span>                                  <div className="d-inline-block">
                                    <h6>{data.supplierDetails.name}</h6>
                                    <p className="text-muted m-b-0">name</p>
                                  </div>
                                </div>
                              </td>
                              <td className="text-right">
                                <h6 className="f-w-700"><i className="fas fa-level-up-alt text-c-green m-l-10"></i></h6>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="d-inline-block align-middle">
                                  <span className="icon-container"><FaEnvelope /></span>                                  <div className="d-inline-block">
                                    <h6>{data.supplierDetails.email}</h6>
                                    <p className="text-muted m-b-0">email</p>
                                  </div>
                                </div>
                              </td>
                              <td className="text-right">
                                <h6 className="f-w-700"><i className="fas fa-level-up-alt text-c-green m-l-10"></i></h6>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="d-inline-block align-middle">
                                  <span className="icon-container"><FaPhone /></span>                                  <div className="d-inline-block">
                                    <h6>{data.supplierDetails.phone}</h6>
                                    <p className="text-muted m-b-0">phone</p>
                                  </div>
                                </div>
                              </td>
                              <td className="text-right">
                                <h6 className="f-w-700"><i className="fas fa-level-up-alt text-c-green m-l-10"></i></h6>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="d-inline-block align-middle">
                                  <span className="icon-container"><FaIdCard /></span>
                                  <div className="d-inline-block">
                                    <h6>{data.supplierDetails.adhar_number}</h6>
                                    <p className="text-muted m-b-0">Adhar number</p>
                                  </div>
                                </div>
                              </td>
                              <td className="text-right">
                                <h6 className="f-w-700"><i className="fas fa-level-up-alt text-c-green m-l-10"></i></h6>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-md-12">

                  <div className="row mb-3">
                    {/*sale card start */}

                    <div className="col-md-6">
                      <div className="card text-center order-visitor-card bg-white border-0">
                        <div className="card-block">
                          <h6 className="m-b-0">Supplied Milk morning</h6>
                          <h4 className="m-t-15 m-b-15"><i className="fa fa-arrow-down m-r-15 text-c-green"></i>{data.morningMilkDetails.morningTotalQuantity} L</h4>
                          <p className="m-b-0">From 3 years</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card text-center order-visitor-card border-0">
                        <div className="card-block">
                          <h6 className="m-b-0">Supplied Milk Evening</h6>
                          <h4 className="m-t-15 m-b-15"><i className="fa fa-arrow-down m-r-15 text-c-green"></i>{data.eveningMilkDetails.eveningTotalQuantity}  L</h4>
                          <p className="m-b-0">From 2 years</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <div className="card bg-secondary text-white total-card border-0">
                        <div className="card-block">
                          <div className="text-left">
                            <h4>{data.morningMilkDetails.morningAvgFatContent}</h4>
                            <p className="m-0">Avg Fat content</p>
                            <span className="label bg-c-red value-badges">{decimalToPercentage(data.morningMilkDetails.morningAvgFatContent)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card bg-warning text-white total-card border-0">
                        <div className="card-block">
                          <div className="text-left">
                            <h4>{data.eveningMilkDetails.eveningAvgFatContent}</h4>
                            <p className="m-0">Avg Fat content</p>
                            <span className="label bg-c-red value-badges">{decimalToPercentage(data.eveningMilkDetails.eveningAvgFatContent)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col-md-6">
                      <div className="card text-center order-visitor-card border-0">
                        <div className="card-block">
                          <h6 className="m-b-0">Total amount</h6>
                          <h4 className="m-t-15 m-b-15">per<i className="fa fa-arrow-down m-r-15 text-c-red"></i> ltr</h4>
                          <p className="m-b-0">{data.combinedMilkDetails.totalAmount} </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card text-center order-visitor-card border-0">
                        <div className="card-block">
                          <h6 className="m-b-0">AVG amount/ltr</h6>
                          <h4 className="m-t-15 m-b-15">per<i className="fa fa-arrow-down m-r-15 text-c-green"></i> ltr</h4>
                          <p className="m-b-0">{data.combinedMilkDetails.avgAmountPerLiter}</p>
                        </div>
                      </div>
                    </div>
                    {/*sale card end */}
                  </div>
                </div>
              </div>
              <div className="row">



                {/*Project statustic end */}
              </div>
            </div>

          </div>

        </div>
      </div >




    </div>
  )
}

export default page