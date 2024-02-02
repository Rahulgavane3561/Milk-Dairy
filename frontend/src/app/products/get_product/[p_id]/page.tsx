/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import Payment from './Payment';
import Styles from './product.module.css';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';

function Page({ params, any }) {



  const router = useRouter();
  const [productDetails, setProductDetails] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const p_id = params.p_id;


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!/^\d+$/.test(p_id)) {
          router.push('/error');
        } else {
          const response = await axios.post('http://localhost:8086/api/product/getproduct', { p_id });
          setProductDetails(response.data.product);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        router.push('/error');
      }
    };

    fetchData();
  }, [p_id, router]);

  useEffect(() => {
    if (productDetails) {
      setTotalPrice(quantity * parseFloat(productDetails.price));
    }
  }, [quantity, productDetails]);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(Math.max(1, newQuantity));
  };

  if (!productDetails) {
    return null;
  }

  // =============================Payment page handling================================

  const handleBuyNow = () => {
    // Check if token exists
    const token = Cookies.get('token');

    if (!token) {
      // If token doesn't exist, show sign-in popup
      setShowSignInPopup(true);
    } else {
      // Show the payment modal
      setShowPayment(true);
    }
  };
  const handleClosePayment = () => {
    // Hide the payment modal
    setShowPayment(false);
  };

  const redirectToSignIn = () =>{
    router.push('/signin')
  }
  // ===================================================================================


  return (
    <div className="product-details-container mt-3">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-12 border d-flex align-items-center justify-content-center">
            <div className="main-image-section ">
              <div className="main-image-area ">
                <img src={`/Productimage/${productDetails.image_link}`} alt={productDetails.product_name} border="0" />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="product-info-details">
              <div className="product-heading">
                <h4>{productDetails.product_name}</h4>
              </div>
              <div className="product-price-section row align-items-center">
                <div className="product-price col-3">
                  <span className="text-primary">{parseFloat(productDetails.price).toFixed(2).replace(/\.?0+$/, '')} INR/Pack</span>
                </div>
                <div className="get-price-btn col-4">
                  <a id={`get_price_${productDetails.product_id}`} className="btn btn-outline-danger border border-danger">Total Price : {totalPrice.toFixed(2).replace(/\.?0+$/, '')}</a>
                </div>
                <div className={Styles._p_add_cart + " col-5"}>
                  <div className={Styles._p_qty}>
                    <span>Add </span>
                    <div
                      className={Styles.value_button + " decrease_"}
                      onClick={() => handleQuantityChange(quantity - 1)}
                      value="Decrease Value"
                    >
                      -
                    </div>
                    <input type="number" className={Styles.pinput} name="qty" id="number" value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
                    />
                    <div
                      className={Styles.value_button + " increase_"}
                      onClick={() => handleQuantityChange(quantity + 1)}
                      value="Increase Value"
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
              {/* Additional product information */}
              <div className="product-details mt-4">
                <h5 className="details-heading">Product Details:</h5>
                <ul className="details-list mt-4">
                  <li className="d-flex align-items-start row">
                    <span className="text-secondary col-5">Brand:</span>
                    <span className="col-6">{productDetails.brand}</span>
                  </li>
                  <hr className="col-12 mx-auto my-2" />
                  <li className="d-flex align-items-start row">
                    <span className="text-secondary col-5">Manufacturer:</span>
                    <span className="col-6">{productDetails.manufacture}</span>
                  </li>
                  <hr className="col-12 mx-auto my-2" />
                  <li className="d-flex align-items-start row">
                    <span className="text-secondary col-5">Product Type:</span>
                    <span className="col-6">{productDetails.product_type}</span>
                  </li>
                  <hr className="col-12 mx-auto my-2" />
                  <li className="d-flex align-items-start row">
                    <span className="text-secondary col-5">Quantity per Pack:</span>
                    <span className="col-6">{productDetails.quantity_per_pack}</span>
                  </li>
                  <hr className="col-12 mx-auto my-2" />
                </ul>
              </div>
              {/* Share product */}
              <div className="share-your-product d-flex align-items-center mt-4">
                <i>Share Your Product:</i>
                <div id="socialShare" className="jssocials">
                  <div className="jssocials-shares d-flex p-3">
                    <div className="jssocials-share jssocials-share-facebook">
                      <a
                        href="#"
                        className="jssocials-share-link"
                      >
                        <img
                          src="https://tiimg.tistatic.com/new_website1/ti-design/catalog/images/fb.png"
                          className="jssocials-share-logo"
                          alt="Loading.."
                        />
                      </a>
                      <div className="jssocials-share-count-box jssocials-share-no-count">
                        <span className="jssocials-share-count"></span>
                      </div>
                    </div>
                    <div className="jssocials-share jssocials-share-twitter">
                      <a
                        href="#"
                        className="jssocials-share-link"
                      >
                        <img
                          src="https://tiimg.tistatic.com/new_website1/ti-design/catalog/images/twitter.png"
                          className="jssocials-share-logo"
                          alt="Loading.."
                        />
                      </a>
                      <div className="jssocials-share-count-box jssocials-share-no-count">
                        <span className="jssocials-share-count"></span>
                      </div>
                    </div>
                    <div className="jssocials-share jssocials-share-linkedin">
                      <a
                        href="#"
                        className="jssocials-share-link"
                      >
                        <img
                          src="https://tiimg.tistatic.com/new_website1/ti-design/catalog/images/linkedin.png"
                          className="jssocials-share-logo"
                          alt="Loading.."
                        />
                      </a>
                      <div className="jssocials-share-count-box jssocials-share-no-count">
                        <span className="jssocials-share-count"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Buttons for actions */}
              <div className="product-detail-btn-section mt-4">
                <button className='btn btn-outline-danger border border-danger w-100' onClick={handleBuyNow}>
                  Buy now
                </button>
                <button className='btn btn-outline-warning border border-warning w-100 mt-3'>
                  Send Inquiry
                </button>
              </div>
              {showSignInPopup && (
                <div className={Styles.overlay}>
                  {/* Your sign-in popup goes here */}
                  <div className={Styles.popup}>
                    <p className="text:'black'">Login is mandatory to continue.</p>
                    <button onClick={() => { setShowSignInPopup(false); redirectToSignIn(); }}>
                      Go to Sign In
                    </button>
                  </div>

                </div>
              )}


              {showPayment && (
                <div className={Styles.overlay}>
                  <Payment productId={p_id} quantity={quantity} totalPrice={totalPrice} onClose={handleClosePayment} />
                </div>
              )}

            </div>
          </div>
        </div>
        {/* Additional product information */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div>
                <strong>Description:</strong>
                <p>{productDetails.description}</p>
              </div>
              {/* ... Other details ... */}
              <div>
                <strong>Manufacturer Address: </strong>
                <p>{productDetails.manufacture_address}</p>
              </div>
              <div>
                <strong>Manufacturer Email:</strong>
                <p>{productDetails.manufacture_email}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <strong>About:</strong>
                <p dangerouslySetInnerHTML={{ __html: productDetails.about }} />
                {/* <p >{productDetails.about }</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Page;
