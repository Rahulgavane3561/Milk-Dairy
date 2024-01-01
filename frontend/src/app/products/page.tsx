// pages/products.js

import { FaStar } from 'react-icons/fa';
import Link from 'next/link';
import React from 'react';
import productsData from './temp';
import styles from './Products.module.css';

const Products = () => {
  return (
    <div className={styles.products}>
      <h1>All Products</h1>
      <div className={styles['product-list']}>
        {productsData.map((product) => (
          <div key={product.id} className={styles['product-card']}>
            <img src="/back.jpg" alt={product.name} className={styles['product-image']} />
            <div className={styles['product-details']}>
              <h2 className={styles['product-name']}>{product.name}</h2>
              <p className={styles.price}>
                <span className={styles['current-price']}>₹300</span>
                <span className={styles.discounted}>₹200</span>
              </p>
              <p className={styles.reviews}>
                {[...Array(product.reviews)].map((_, index) => (
                  <FaStar key={index} className={styles['star-icon']} />
                ))}
              </p>
              <Link href={`/product/${product.id}`}>
                <li className={`${styles.btn} ${styles['btn-primary']}`}>
                  View Details <span className={styles['arrow-icon']}>&#8594;</span>
                </li>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
