import React, { Component } from "react";
import { Link } from "react-router-dom";

import hero2 from "../../images/slider/img-1.png";
import hero3 from "../../images/slider/img-2.png";
import hero4 from "../../images/slider/img-3.png";

class Hero extends Component {
  render() {
    return (
      <section className="hero hero-style-1">
        <div className="hero-slider">
          <div className="slide">
            <div className="container">
              <div className="row">
                <div className="col col-lg-5 slide-caption">
                  <div className="slide-title">
                    <h2>
                      <span>FIND GIFT</span> <br /> THAT MATCHES YOUR
                      PERSONALIZED EXPERIENCE
                    </h2>
                  </div>
                  <p>
                    All Handmade with Care, MeGift Delivers Joy in Every Box
                  </p>
                  <div className="btns">
                    <Link to="/shop" className="btn theme-btn">
                      Shop Now <i className="fa fa-angle-double-right"></i>
                    </Link>
                  </div>
                  <div className="stats-section">
                    <div className="">
                      <div className="row">
                        <div className="col-lg-4">
                          <h3>200+</h3>
                          <p>Handmade Products</p>
                        </div>
                        <div className="col-lg-4">
                          <h3>2,000+</h3>
                          <p>High-Quality Products</p>
                        </div>
                        <div className="col-lg-4">
                          <h3>30,000+</h3>
                          <p>Happy Customers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-image">
              {/* <div className="simg-1">
                <img src={hero2} alt="slide-img" />
              </div> */}
              <div className="simg-2">
                <img src={hero3} alt="slide-img" />
              </div>
            </div>
            {/* <div className="hero-shape-img">
              <img src={hero4} alt="slide-img" />
            </div> */}
          </div>
        </div>
      </section>
    );
  }
}

export default Hero;
