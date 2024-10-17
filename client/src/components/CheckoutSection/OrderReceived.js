import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const OrderReceived = () => {
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const responseCode = query.get("vnp_ResponseCode");

    if (responseCode === "00") {
      alert("Thanh toán thành công!");
    } else {
      alert("Thanh toán thất bại hoặc bị hủy.");
    }
  }, [location]);

  return <h2>Đơn hàng của bạn đã được xử lý.</h2>;
};

export default OrderReceived;
