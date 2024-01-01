"use client"

import './about.css';

import Image from "next/image";

export default function About() {
  return (
    <>
      <div className="about-section">
        <h1>Welcome to Nexus Dairy</h1>
        <p> At Nexus Dairy, we are passionate about delivering the purest and freshest dairy
          products straight from our farms to your table. Our journey began with a vision to provide
          not just milk but a wholesome experience that embodies the essence of nourishment, health,
          and taste.</p>

      </div>
      {/* =========================================================================================== */}
      <div className="service component__space" id="Services">
        <div className="heading">
          <h1 className="heading">Our Services</h1>
          <p className="heading p__color">
            There are many variations of passages of Lorem Ipsum available,
          </p>
          <p className="heading p__color">
            but the majority have suffered alteration,
          </p>
        </div>

        <div className="container">
          <div className="row">


            <div className="col-md-4 col__3 column">
              <div className="service__box pointer">
                <div className="icon">
                  <div className="icon">
                    <i className="fas fa-shopping-cart"></i>
                  </div>

                </div>
                <div className="service__meta">
                  <h1 className="service__text">Dairy Product Cataloguey</h1>
                  <p className="p service__text p__color">
                    Showcase a variety of dairy
                  </p>
                  <p className="p service__text p__color">
                    products with descriptions,
                  </p>
                  <p className="p service__text p__color">
                    images, and pricing.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 col__3 column">
              <div className="service__box pointer">
                <div className="icon">
                  <i className='fas fa-headset'></i>
                </div>
                <div className="service__meta">
                  <h1 className="service__text">Customer Support</h1>
                  <p className="p service__text p__color">
                    Provide assistance for inquiries,
                  </p>
                  <p className="p service__text p__color">
                    order issues, and product-
                  </p>
                  <p className="p service__text p__color">
                    related questions.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 col__3 column">
              <div className="service__box pointer">
                <div className="icon">
                  <i className='fas fa-paw'></i>
                </div>
                <div className="service__meta">
                  <h1 className="service__text">Veterinary Services</h1>
                  <p className="p service__text p__color">
                    Offer medical support and guidance
                  </p>
                  <p className="p service__text p__color">
                    for cow health and
                  </p>
                  <p className="p service__text p__color">
                    well-being.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className="col-md-4 col__3 column">
              <div className="service__box pointer">
                <div className="icon">
                  <i className='fas fa-flask'></i>
                </div>
                <div className="service__meta">
                  <h1 className="service__text">Milk Collection from producers</h1>
                  <p className="p service__text p__color">
                    Facilitate the collection of milk
                  </p>
                  <p className="p service__text p__color">
                    from local farmers for
                  </p>
                  <p className="p service__text p__color">
                    processing.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 col__3 column">
              <div className="service__box pointer">
                <div className="icon">
                  <i className='fas fa-seedling'></i>
                </div>
                <div className="service__meta">
                  <h1 className="service__text">Animal Feed Supply</h1>
                  <p className="p service__text p__color">
                    Provide quality and nutritious feed
                  </p>
                  <p className="p service__text p__color">
                    for cattle and
                  </p>
                  <p className="p service__text p__color">
                    dairy animals.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 col__3 column">
              <div className="service__box pointer">
                <div className="icon">
                  <i className='fas fa-chart-bar'></i>
                </div>
                <div className="service__meta">
                  <h1 className="service__text">Market Analysis</h1>
                  <p className="p service__text p__color">
                    Conduct market research and analysis
                  </p>
                  <p className="p service__text p__color">
                    or product demand and
                  </p>
                  <p className="p service__text p__color">
                    growth opportunities.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* =========================================================================================== */}

      <h2 className='text-center'>Our Team</h2>
      <div className="row" style={{padding:'0px 10%',}}>
        <div className="column">
          <div className="card">
            <Image src="/backa.jpg" alt="Jane" width={300} height={200} layout="responsive" />
            <div className="container">
              <h2>Rahul </h2>
              <p className="title">CEO</p>
              <p>Leading with innovation, vision, and dedication for impactful global growth.</p>
              <p className="our-email">rahulgavane65@gmail.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <Image src="/backa.jpg" alt="Mike" width={300} height={200} layout="responsive" />
            <div className="container">
              <h2>Basavaraj</h2>
              <p className="title">Manager</p>
              <p>Driving team synergy, efficiency, and excellence towards collective success.</p>
              <p className="our-email">basu@gmailcom.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <Image src="/backa.jpg" alt="John" width={300} height={200} layout="responsive" />
            <div className="container">
              <h2>Ashok</h2>
              <p className="title">Founder</p>
              <p>Pioneering visionaries, building legacies, transforming futures with passion-driven leadership.</p>
              <p className="our-email">ashok@gmail.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
