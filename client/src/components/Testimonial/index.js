import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import test1 from "../../images/testimonial/1.png";
import test2 from "../../images/testimonial/3.png";
import test3 from "../../images/testimonial/2.png";

class Testimonial extends Component {
  render() {
    var settings = {
      dots: false,
      arrows: true,
      speed: 1200,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
      fade: true,
    };

    return (
      <section className="testimonial-area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="section-title">
                <h2>
                  Client <span>Testimonial</span>
                </h2>
                <p>
                  See what our customers are saying about our premium
                  accessories and the quality craftsmanship we offer.
                </p>
              </div>
            </div>
          </div>
          <div className="testimonial-wrap">
            <div className="testimonial-active">
              <Slider {...settings}>
                <div className="testimonial-item">
                  <div className="testimonial-img">
                    <img src={test1} alt="" />
                    <div className="t-quote">
                      <i className="fi flaticon-left-quote"></i>
                    </div>
                  </div>
                  <div className="testimonial-content">
                    <p>
                      "Chiếc vòng cổ mà tôi mua thật sự đẹp hơn cả mong đợi.
                      Thiết kế rất tinh xảo, sang trọng và nhận được rất nhiều
                      lời khen từ bạn bè. Rất đáng mua cho những ai tìm kiếm
                      những món phụ kiện độc đáo."
                    </p>
                    <div className="testimonial-author">
                      <h3>Nguyễn Thu Trang</h3>
                      <span>CEO, TrangPham</span>
                    </div>
                    <div className="t-content-quote">
                      <i className="fi flaticon-left-quote"></i>
                    </div>
                  </div>
                </div>
                <div className="testimonial-item">
                  <div className="testimonial-img">
                    <img src={test2} alt="" />
                    <div className="t-quote">
                      <i className="fi flaticon-left-quote"></i>
                    </div>
                  </div>
                  <div className="testimonial-content">
                    <p>
                      "Chiếc vòng tay tôi đặt hàng vượt ngoài sự mong đợi. Thiết
                      kế hiện đại, rất hợp thời và chất lượng tuyệt vời. Tôi rất
                      hài lòng với sự chăm sóc tận tình của cửa hàng."
                    </p>
                    <div className="testimonial-author">
                      <h3>Trần Văn Nam</h3>
                      <span>Nhà Sáng Lập, NamArtisan</span>
                    </div>
                    <div className="t-content-quote">
                      <i className="fi flaticon-left-quote"></i>
                    </div>
                  </div>
                </div>
                <div className="testimonial-item">
                  <div className="testimonial-img">
                    <img src={test3} alt="" />
                    <div className="t-quote">
                      <i className="fi flaticon-left-quote"></i>
                    </div>
                  </div>
                  <div className="testimonial-content">
                    <p>
                      "Chiếc đồng hồ tôi mua là sự lựa chọn hoàn hảo. Nó không
                      chỉ đẹp mà còn mang lại cảm giác đẳng cấp. Tôi rất hài
                      lòng với chất lượng sản phẩm và dịch vụ."
                    </p>
                    <div className="testimonial-author">
                      <h3> Lê Thanh Hương</h3>
                      <span>Blog Sống Đẹp</span>
                    </div>
                    <div className="t-content-quote">
                      <i className="fi flaticon-left-quote"></i>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Testimonial;
