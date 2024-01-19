"use client";

import React, { useEffect } from 'react';

import Styles from './product.module.css'
import { useRouter } from 'next/navigation';

function Page({ params, any }) {
  const router = useRouter();
  const p_id = params.p_id;

  useEffect(() => {
    if (!/^\d+$/.test(p_id)) {
      router.push('/error');
    }
  }, [p_id]);

  if (!/^\d+$/.test(p_id)) {
    return null;
  }

  return (
    <div className="product-details-container">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-12 ">
            <div className="main-image-section">
              <div className="main-image-area border">
                <img src="https://cpimg.tistatic.com/08166411/b/4/Godrej-Super-50-Kg-Cattle-Feed.jpg" alt="Godrej Super 50 Kg Cattle Feed" border="0" />
              </div>
            </div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis nobis fuga magni incidunt aut aspernatur sequi. Iusto amet culpa aut deleniti, nemo molestias minus in iure quia adipisci assumenda fugiat soluta quo ducimus. Eius, id nisi perferendis at repudiandae magnam autem illo architecto.</div>
          </div>
          <div className="col-md-6 col-12">
            <div className="product-info-details">
              <div className="product-heading">
                <h4>Godrej Super 50 Kg Cattle Feed</h4>
              </div>
              <div className="product-price-section row align-items-center">
                <div className="product-price col-3">
                  <span className="text-primary">1120 INR/Pack</span>
                </div>
                <div className="get-price-btn col-4">
                  <a id="get_price_8166411" className="btn btn-outline-danger border border-danger">Get a Price/Quote</a>
                </div>


                <div className={Styles._p_add_cart + " col-5"}>
                  <div className={Styles._p_qty}>
                    <span>Add </span>
                    <div className={Styles.value_button + " decrease_"}
                      onClick={() => {
                        const input = document.getElementById('number');
                        input.value = parseInt(input.value, 10) - 1;
                      }} value="Decrease Value">-</div>
                    <input type="number" className={Styles.pinput} name="qty" id="number" value="1" />
                    <div className={Styles.value_button + " increase_"}
                      onClick={() => {
                        const input = document.getElementById('number');
                        input.value = parseInt(input.value, 10) + 1;
                      }}
                      value="Increase Value">+</div>
                  </div>
                </div>



              </div>
              <div className="product-details mt-4">
                <h5 className="details-heading">Product Details:</h5>
                <ul className="details-list mt-4">
                  <li className="d-flex align-items-start row">
                    <span className="text-secondary col-5">brand:</span>
                    <span className="col-6">Powder</span>
                  </li>
                  <hr className="col-12 mx-auto my-2" />
                  <li className="d-flex align-items-start row">
                    <span className="text-secondary col-5">manufacture:</span>
                    <span className="col-6">First Class</span>
                  </li>
                  <hr className="col-12 mx-auto my-2" />
                  <li className="d-flex align-items-start row">
                    <span className="text-secondary col-5">product-type:</span>
                    <span className="col-6">Healthcare supplement</span>
                  </li>
                  <hr className="col-12 mx-auto my-2" />
                  <li className="d-flex align-items-start row">
                    <span className="text-secondary col-5">quantity-per-pack:</span>
                    <span className="col-6">Feed Preservatives</span>
                  </li>
                  <hr className="col-12 mx-auto my-2" />
                  <li>
                    <div className="share-your-product d-flex align-items-center mt-4">
                      <i>Share Your Product:</i>
                      <div id="socialShare" className="jssocials">
                        <div className="jssocials-shares d-flex">
                          <div className="jssocials-share jssocials-share-facebook me-3">
                            <a href="#" className="jssocials-share-link">
                              <img src="https://tiimg.tistatic.com/new_website1/ti-design/catalog/images/fb.png" className="jssocials-share-logo" />
                            </a>
                          </div>
                          <div className="jssocials-share jssocials-share-twitter me-3">
                            <a href="#" className="jssocials-share-link">
                              <img src="https://tiimg.tistatic.com/new_website1/ti-design/catalog/images/twitter.png" className="jssocials-share-logo" />
                            </a>

                          </div>
                          <div className="jssocials-share jssocials-share-linkedin me-3">
                            <a href="#" className="jssocials-share-link">
                              <img src="https://tiimg.tistatic.com/new_website1/ti-design/catalog/images/linkedin.png" className="jssocials-share-logo" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                  </li>
                  <hr className="col-12 mx-auto my-2 mt-3" />
                </ul>
              </div>

              <div className="product-detail-btn-section mt-4">
                <button className='btn btn-outline-danger border border-danger w-100'>
                  Buy now
                </button>
                <button className='btn btn-outline-warning border border-warning w-100 mt-3'>
                  Send Inquiry
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
