/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from 'react';

import { FaRegMoneyBillAlt } from 'react-icons/fa'; // Import the icon
import Image from 'next/image';
import Link from 'next/link';
import Styles from './products.module.css';
import axios from 'axios';

const Product = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:8086/api/product/getproducts');

        if (response.data.Status === 'Success') {
          alert("Success");
          setData(response.data.Result);
        } else {
          setError('Error fetching data');
        }
      } catch (error) {
        setError(`Error sending request: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={Styles.productContainer}>
      <h1 className={Styles.sectionTitle}>Our Products</h1>

      <div className={Styles.productsGrid}>
        {data.map((product, index) => {
          const isEven = index % 2 === 0;
          const cardStyle = isEven ? Styles.productCardEven : Styles.productCardOdd;

          // Calculate discounted price (10% increase)
          const originalPrice = parseFloat(product.price);
          const discountedPrice = (originalPrice * 1.1).toFixed(2);

          return (
            <div key={index} className={`${Styles.productCard} ${cardStyle}`}>
              <div className={Styles.productImageContainer}>
                <img
                  src={`/Productimage/${product.image_link}`}
                  alt="Milk"
                  className={Styles.productImage}
                />
              </div>
              <div className={Styles.productDetails}>
                <h3 className={Styles.productName}>{product.product_name}</h3>
                <p className={Styles.productDescription}>{product.short_description}</p>
                <p className={Styles.discountedPrice}>
                  <span className={Styles.discountIcon}></span>
                  Actual Price: <span className={`${Styles.Actual} ${Styles.strikeThrough}`}>&#8377;{discountedPrice}</span>
                </p>
               
                
                {/* Discounted Price */}
                <p className={Styles.productPrice}>Price: &#8377;{product.price}</p>

                <Link href={`./products/get_product/${product.product_id}`}>
                  <span className={Styles.buyButton}>
                    Buy now
                  </span>
                </Link>
                <span className={`${Styles.starRating} m-3`}>
                  <i className={`${Styles.starFilled} fas fa-star`}></i>
                  <i className={`${Styles.starFilled} fas fa-star`}></i>
                  <i className={`${Styles.starFilled} fas fa-star`}></i>
                  <i className={`${Styles.starFilled} fas fa-star`}></i>
                  <i className={`${Styles.starEmpty} far fa-star`}></i>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Product;
