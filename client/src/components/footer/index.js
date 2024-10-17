import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/Megift-logo.png";

const Footer = (props) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <footer className="tp-site-footer">
      <div className="tp-upper-footer">
        <div className="container">
          <div className="row">
            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="widget about-widget">
                <div className="logo widget-title">
                  <Link onClick={ClickHandler} to="/">
                    <img src={Logo} alt="ft-logo" />
                  </Link>
                </div>
                <p>
                  "Chúng tôi cung cấp một bộ sưu tập trang sức thủ công tuyệt
                  đẹp, được thiết kế để thêm phần sang trọng cho mọi dịp."
                </p>

                <ul>
                  <li>
                    <Link onClick={ClickHandler} to="/">
                      <i className="ti-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={ClickHandler} to="/">
                      <i className="ti-twitter-alt"></i>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={ClickHandler} to="/">
                      <i className="ti-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={ClickHandler} to="/">
                      <i className="ti-google"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="widget tp-service-link-widget">
                <div className="widget-title">
                  <h3>Liên Hệ </h3>
                </div>
                <div className="contact-ft">
                  <ul>
                    <li>
                      <i className="fi flaticon-pin"></i>Lô E2a-7, Đường D1, Đ.
                      D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh
                    </li>
                    <li>
                      <i className="fi flaticon-call"></i>84+ 822882419
                    </li>
                    <li>
                      <i className="fi flaticon-envelope"></i>
                      megift.ladia@gmail.com
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="widget link-widget">
                <div className="widget-title">
                  <h3>Tài Khoản</h3>
                </div>
                <ul>
                  <li>
                    <Link onClick={ClickHandler} to="/project">
                      Dự Án
                    </Link>
                  </li>
                  <li>
                    <Link onClick={ClickHandler} to="/shop">
                      Cửa hàng
                    </Link>
                  </li>
                  <li>
                    <Link onClick={ClickHandler} to="/wishlist">
                      Yêu Thích
                    </Link>
                  </li>
                  <li>
                    <Link onClick={ClickHandler} to="/checkout">
                      Thanh Toán
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="widget newsletter-widget">
                <div className="widget-title">
                  <h3>Email</h3>
                </div>
                <p>Bạn sẽ được thông báo nếu có sản phẩm mới.</p>
                <form>
                  <div className="input-1">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address *"
                      required
                    />
                  </div>
                  <div className="submit clearfix">
                    <button type="submit">
                      <i className="ti-email"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tp-lower-footer">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12">
              <p className="copyright">
                {" "}
                Copyright &copy; 2021 Annahl by{" "}
                <Link onClick={ClickHandler} to="/">
                  themepresss
                </Link>
                . All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-shape1">
        <i className="fi flaticon-honeycomb"></i>
      </div>
      <div className="footer-shape2">
        <i className="fi flaticon-honey-1"></i>
      </div>
    </footer>
  );
};

export default Footer;
