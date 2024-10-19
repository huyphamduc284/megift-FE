import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const CheckoutSubscription = () => {
  const { state } = useLocation(); // Nhận dữ liệu từ trang trước
  const { selectedPlan } = state; // Gói đã chọn
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  // Xử lý thanh toán
  const handlePayment = () => {
    if (paymentMethod === "paypal") {
      // Chuyển đến thanh toán qua PayPal
      console.log("Thanh toán PayPal cho gói:", selectedPlan.name);
    } else if (paymentMethod === "vnpay") {
      // Chuyển đến thanh toán VNPay
      console.log("Thanh toán VNPay cho gói:", selectedPlan.name);
    } else {
      navigate("/order_received");
    }
  };

  return (
    <div className="checkout-section">
      <h2>Thanh Toán Gói {selectedPlan.name}</h2>
      <p>Giá: {selectedPlan.price}</p>

      <div>
        <label>
          <input
            type="radio"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={() => setPaymentMethod("paypal")}
          />
          Thanh toán qua PayPal
        </label>
        <label>
          <input
            type="radio"
            value="vnpay"
            checked={paymentMethod === "vnpay"}
            onChange={() => setPaymentMethod("vnpay")}
          />
          Thanh toán qua VNPay
        </label>
      </div>

      {paymentMethod === "paypal" && (
        <PayPalScriptProvider
          options={{
            "client-id": "your-client-id", // Thay thế bằng Client ID của bạn
            currency: "USD",
          }}
        >
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: selectedPlan.price.replace(/[,.đ]/g, ""), // Xóa ký tự không cần thiết
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                alert(
                  "Thanh toán thành công bởi " + details.payer.name.given_name
                );
                navigate("/order_received");
              });
            }}
          />
        </PayPalScriptProvider>
      )}

      <button
        className="cBtn cBtnLarge cBtnTheme mt-20"
        onClick={handlePayment}
      >
        {paymentMethod === "paypal"
          ? "Tiến hành thanh toán qua PayPal"
          : "Tiến hành thanh toán qua VNPay"}
      </button>
    </div>
  );
};

export default CheckoutSubscription;
