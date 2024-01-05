"use client"

import "./sy.css"

import { FaCalendarAlt, FaDollarSign, FaEnvelope, FaExclamationCircle, FaGlassWhiskey, FaIdCard, FaMoneyBillAlt, FaMoneyCheckAlt, FaPhone, FaShoppingCart, FaTint, FaUser } from 'react-icons/fa';

import Cookies from 'js-cookie';
import Image from 'next/image'
import React from 'react'
import { jwtDecode } from 'jwt-decode';
import styles from "./supplerprofile.module.css"

function page() {
  function sum() {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    alert(userId);
  }

  return (
    <div className={styles.main}>

      <div className='p-4'>
        <h1 className="mt-4" onClick={sum}>Dashboard</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">current week status</li>
        </ol>


        <div className="row z-index-1">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">    <FaGlassWhiskey /> supplied milk</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <span className="small text-white stretched-link" href="#">80 ltr</span>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">    <FaTint />Avg Fat content</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <span className="small text-white stretched-link" href="#">8</span>

              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">  <FaDollarSign />amount</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <span className="small text-white stretched-link" href="#">8000</span>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-danger text-white mb-4">
              <div className="card-body">    <FaCalendarAlt /> Year-2024</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <span className="small text-white stretched-link" href="#">month-janualry</span>
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
                              <h5>10000</h5>
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
                              <h5>6000</h5>
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
                                    <h6>Rahul</h6>
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
                                    <h6>rahulgavne65@gmail.com</h6>
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
                                    <h6>8105356165</h6>
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
                                    <h6>5269-2388-5391</h6>
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
                          <h4 className="m-t-15 m-b-15"><i className="fa fa-arrow-down m-r-15 text-c-green"></i>7652 L</h4>
                          <p className="m-b-0">From 3 years</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card text-center order-visitor-card border-0">
                        <div className="card-block">
                          <h6 className="m-b-0">Supplied Milk Evening</h6>
                          <h4 className="m-t-15 m-b-15"><i className="fa fa-arrow-down m-r-15 text-c-green"></i>6325 L</h4>
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
                            <h4>8.9</h4>
                            <p className="m-0">Avg Fat content</p>
                            <span className="label bg-c-red value-badges">89%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card bg-warning text-white total-card border-0">
                        <div className="card-block">
                          <div className="text-left">
                            <h4>6.7</h4>
                            <p className="m-0">Avg Fat content</p>
                            <span className="label bg-c-green value-badges">67%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col-md-6">
                      <div className="card text-center order-visitor-card border-0">
                        <div className="card-block">
                          <h6 className="m-b-0">Avg amount</h6>
                          <h4 className="m-t-15 m-b-15">per<i className="fa fa-arrow-down m-r-15 text-c-red"></i> ltr</h4>
                          <p className="m-b-0">56 </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card text-center order-visitor-card border-0">
                        <div className="card-block">
                          <h6 className="m-b-0">current amount/ltr</h6>
                          <h4 className="m-t-15 m-b-15">per<i className="fa fa-arrow-down m-r-15 text-c-green"></i> ltr</h4>
                          <p className="m-b-0">65</p>
                        </div>
                      </div>
                    </div>
                    {/*sale card end */}
                  </div>
                </div>
              </div>
              <div className="row">

                <div className="col-xl-12">
                  <div className="card proj-progress-card">
                    <div className="card-block">
                      <div className="row">
                        <div className="col-xl-3 col-md-6">
                          <h6>Published Project</h6>
                          <h5 className="m-b-30 f-w-700">532<span className="text-c-green m-l-10">+1.69%</span></h5>
                          <div className="progress">
                            <div className="progress-bar rounded-r-lg bg-red-500" style={{ width: '25%', minWidth: '10px' }}></div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                          <h6>Completed Task</h6>
                          <h5 className="m-b-30 f-w-700">4,569<span className="text-c-red m-l-10">-0.5%</span></h5>
                          <div className="progress ">
                            <div className="progress-bar rounded-r-lg bg-blue-500" style={{ width: '65%', minWidth: '10px' }}></div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                          <h6>Successful Task</h6>
                          <h5 className="m-b-30 f-w-700">89%<span className="text-c-green m-l-10">+0.99%</span></h5>
                          <div className="progress">
                            <div className="progress-bar rounded-r-lg bg-green-500" style={{ width: '85%', minWidth: '10px' }}></div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                          <h6>Ongoing Digs</h6>
                          <h5 className="m-b-30 f-w-700">365<span className="text-c-green m-l-10">+0.35%</span></h5>
                          <div className="progress">
                            <div className="progress-bar bg-c-yellow" style={{ width: '45%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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