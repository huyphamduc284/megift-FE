import React from "react";
import "./index.css";

const plans = [
  {
    name: "GÓI TRỌN ĐỜI",
    price: "999.999đ",
    oldPrice: "3.999.000đ",
    description: [
      "Thanh toán một lần để sử dụng dịch vụ trọn đời",
      "Truy cập trọn đời tất cả các bộ phần tử cao cấp",
      "Hưởng các quyền lợi như các gói khác",
    ],
    mostPopular: true,
  },
  {
    name: "GÓI 1 THÁNG",
    price: "129.000đ",
    oldPrice: "149.000đ",
    description: [
      "15 thiết kế mỗi ngày",
      "30 ngày sử dụng tất cả các phần tử cao cấp",
      "Không có quảng cáo",
      "Giảm 15.000đ phí vận chuyển cho mọi đơn hàng",
      "Giảm 10% vào ngày sinh nhật",
    ],
  },
  {
    name: "GÓI 6 THÁNG",
    price: "699.000đ",
    oldPrice: "799.000đ",
    description: [
      "15 thiết kế mỗi ngày",
      "180 ngày sử dụng tất cả các phần tử cao cấp",
      "Không có quảng cáo",
      "Giảm 15k phí vận chuyển cho mọi đơn hàng",
      "Giảm 10% vào ngày sinh nhật",
      "Trải nghiệm miễn phí 1 tháng",
    ],
  },
  {
    name: "GÓI 1 NĂM",
    price: "1.290.000đ",
    oldPrice: "1.690.000đ",
    description: [
      "Thiết kế không giới hạn",
      "365 ngày sử dụng tất cả các phần tử cao cấp",
      "Không có quảng cáo",
      "Giảm 15k phí vận chuyển cho mọi đơn hàng",
      "Giảm 10% vào ngày sinh nhật",
      "Trải nghiệm miễn phí 1 tháng",
    ],
  },
];

const PricingPlan = ({ plan }) => {
  return (
    <div className={`plan-card ${plan.mostPopular ? "popular" : ""}`}>
      {plan.mostPopular && <div className="most-popular">PHỔ BIẾN NHẤT</div>}
      <div className="plan-content">
        <h3 className="plan-name">{plan.name}</h3>
        <p className="price">
          {plan.price} <span className="old-price">{plan.oldPrice}</span>
        </p>
        <ul>
          {plan.description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="plan-actions">
        <button className="subscribe-button">Đăng ký ngay</button>
        <p className="cancel-anytime">Hủy bất cứ lúc nào</p>
      </div>
    </div>
  );
};

const PricingTable = () => {
  return (
    <table className="features-table">
      <thead>
        <tr>
          <th>TÍNH NĂNG</th>
          <th>MIỄN PHÍ</th>
          <th>THÀNH VIÊN</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Thiết kế mỗi ngày</td>
          <td>2 thiết kế/ngày</td>
          <td>15 thiết kế/ngày</td>
        </tr>
        <tr>
          <td>Không quảng cáo</td>
          <td>✘</td>
          <td>✔</td>
        </tr>
        <tr>
          <td>Sử dụng tất cả phần tử cao cấp</td>
          <td>✘</td>
          <td>✔</td>
        </tr>
        <tr>
          <td>Giảm 10% vào ngày sinh nhật</td>
          <td>✘</td>
          <td>✔</td>
        </tr>
        <tr>
          <td>Giảm phí vận chuyển</td>
          <td>✘</td>
          <td>✔</td>
        </tr>
      </tbody>
    </table>
  );
};

const ChooseYourPlan = () => {
  return (
    <div className="pricing-section">
      <h2 className="title">CHỌN GÓI CỦA BẠN</h2>
      <div className="popular-plan-container">
        <PricingPlan plan={plans[0]} />
      </div>
      <div className="plans-container">
        {plans.slice(1).map((plan, index) => (
          <PricingPlan key={index} plan={plan} />
        ))}
      </div>
      <PricingTable />
    </div>
  );
};

export default ChooseYourPlan;
