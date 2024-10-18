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
                <div className="col col-lg-5 col-md-6 slide-caption">
                  <div className="slide-title">
                    <h2>
                      <span>TÌM KIẾM QUÀ TẶNG</span> <br />
                      PHÙ HỢP VỚI MONG MUỐN CỦA BẠN
                    </h2>
                  </div>
                  <p>
                    Tất cả đều được làm thủ công cẩn thận, MeGift mang niềm vui
                    đến trong mỗi hộp quà
                  </p>{" "}
                  <br />
                  <div className="btns">
                    <Link to="/shop" className="btn theme-btn">
                      Mua Ngay <i className="fa fa-angle-double-right"></i>
                    </Link>
                  </div>
                  <div className="stats-section mt-4">
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-sm-12">
                        <h3>200+</h3>
                        <p>Sản phẩm thủ công</p>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-12">
                        <h3>2,000+</h3>
                        <p>Sản phẩm chất lượng cao</p>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-12">
                        <h3>30,000+</h3>
                        <p>Khách hàng hài lòng</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col col-lg-7 col-md-6 d-none d-lg-block right-image">
                  <div className="simg-2">
                    <img src={hero3} alt="slide-img" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Hero;
