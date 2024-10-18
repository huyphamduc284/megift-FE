import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const OrderReceived = () => {
  const location = useLocation();
  const [statusMessage, setStatusMessage] = useState("");
  const [orderInfo, setOrderInfo] = useState({
    orderId: "",
    amount: "",
    responseCode: "",
  });

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const responseCode = query.get("vnp_ResponseCode");
    const orderId = query.get("vnp_TxnRef"); // Transaction reference
    const amount = query.get("vnp_Amount"); // Transaction amount

    if (responseCode === "00") {
      setStatusMessage("Thanh toán thành công!");
    } else {
      setStatusMessage("Thanh toán thất bại hoặc bị hủy.");
    }

    setOrderInfo({
      orderId,
      amount: (amount / 100).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      }),
      responseCode,
    });
  }, [location]);

  return (
    <div>
      <h2>Đơn hàng của bạn đã được xử lý.</h2>
      <p>{statusMessage}</p>
      {orderInfo.orderId && (
        <div>
          <p>
            <strong>Mã đơn hàng:</strong> {orderInfo.orderId}
          </p>
          <p>
            <strong>Số tiền:</strong> {orderInfo.amount}
          </p>
          <p>
            <strong>Mã phản hồi:</strong> {orderInfo.responseCode}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderReceived;
