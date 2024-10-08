import React from "react";
import { Link } from "react-router-dom";
import abimg from "../../images/offerimg.png";

const OfferSection = (props) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };
  return (
    <section className="offer-area section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <div className="offer-img">
              <img src={abimg} alt="" />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="offer-wrap">
              <div className="offer-title">
                <small>Exclusive Offer for Customers</small>
                <h2>
                  Premium Accessories Collection <br /> To 58% Off.
                </h2>
              </div>
              <p>
                Explore a curated selection of luxury watches, belts, bracelets,
                and more to complement your style. Indulge in elegance with our
                latest range of accessories crafted with precision. Limited time
                offer—grab your favorites now!
              </p>
              <Link onClick={ClickHandler} to="/shop" className="btn theme-btn">
                Shop Now <i className="fa fa-angle-double-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
