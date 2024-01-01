import React from 'react';

const ProductsPage = () => {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      image: '/product1.jpg', 
      price: 19.99,
      reviews: [
        { id: 1, rating: 4 },
        { id: 2, rating: 5 },
      ],
    },

  ];

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Products</h1>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <img src='/backa.jpg' className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <button className="btn btn-primary">Buy Now</button>
                  <div>
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={
                          index < Math.round(product.reviews.reduce((acc, cur) => acc + cur.rating, 0) / product.reviews.length)
                            ? 'text-warning fa fa-star'
                            : 'text-secondary fa fa-star'
                        }
                      />
                    ))}
                    <span className="ml-2">{`${product.reviews.length} reviews`}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
