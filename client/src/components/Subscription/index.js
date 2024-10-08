import React from "react";
import "./index.css";

const plans = [
  {
    name: "LIFETIME PLAN",
    price: "999.999đ",
    oldPrice: "3.999.000đ",
    description: [
      "Pay a one-time fee to use the service for life",
      "Lifetime access to all premium element sets",
      "Enjoy the same benefits as other packages",
    ],
    mostPopular: true,
  },
  {
    name: "1 MONTHS PLAN",
    price: "129.000đ",
    oldPrice: "149.000đ",
    description: [
      "15 designs per day",
      "30 days to use all premium elements",
      "No advertising",
      "15,000 VND shipping discount for all orders",
      "10% off on birthday",
    ],
  },
  {
    name: "6 MONTHS PLAN",
    price: "699.000đ",
    oldPrice: "799.000đ",
    description: [
      "15 designs per day",
      "180 days of using all premium elements",
      "No advertising",
      "15k shipping discount for all orders",
      "10% off on birthday",
      "Experience 1 month free",
    ],
  },
  {
    name: "ANNUAL PLAN",
    price: "1.290.000đ",
    oldPrice: "1.690.000đ",
    description: [
      "Unlimited designs",
      "365 days of using all premium elements",
      "No advertising",
      "15k shipping discount for all orders",
      "10% off on birthday",
      "Experience 1 month free",
    ],
  },
];

const PricingPlan = ({ plan }) => {
  return (
    <div className={`plan-card ${plan.mostPopular ? "popular" : ""}`}>
      {plan.mostPopular && <div className="most-popular">MOST POPULAR</div>}
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
        <button className="subscribe-button">Subscribe now</button>
        <p className="cancel-anytime">Cancel anytime</p>
      </div>
    </div>
  );
};

const PricingTable = () => {
  return (
    <table className="features-table">
      <thead>
        <tr>
          <th>FEATURES</th>
          <th>FREE</th>
          <th>MEMBERSHIP</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Design every day</td>
          <td>2 designs/day</td>
          <td>15 designs/day</td>
        </tr>
        <tr>
          <td>No advertising</td>
          <td>✘</td>
          <td>✔</td>
        </tr>
        <tr>
          <td>Use all premium elements</td>
          <td>✘</td>
          <td>✔</td>
        </tr>
        <tr>
          <td>10% discount on birthday</td>
          <td>✘</td>
          <td>✔</td>
        </tr>
        <tr>
          <td>Shipping discount</td>
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
      <h2 className="title">CHOOSE YOUR PLAN</h2>
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
