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
                <small>Ưu Đãi Đặc Biệt Dành Cho Khách Hàng</small>
                <h2>
                  Bộ Sưu Tập Phụ Kiện Cao Cấp <br /> Giảm Đến 58%.
                </h2>
              </div>
              <p>
                Khám phá bộ sưu tập dây chuyền, nhẫn, vòng tay và nhiều hơn nữa
                để hoàn thiện phong cách của bạn. Thưởng thức sự thanh lịch với
                loạt phụ kiện mới nhất của chúng tôi, được chế tác tinh xảo. Ưu
                đãi có thời hạn—sở hữu ngay những món yêu thích của bạn!
              </p>
              <Link onClick={ClickHandler} to="/shop" className="btn theme-btn">
                Mua Ngay <i className="fa fa-angle-double-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
