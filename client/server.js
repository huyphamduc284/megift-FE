const express = require("express");
const crypto = require("crypto");
const querystring = require("qs");
const moment = require("moment");
const app = express();

// VNPay Configuration
const vnp_TmnCode = "HFANROC2"; // Thay bằng mã website của bạn
const vnp_HashSecret = "6P3XBJYOBU8UT2DD7HB97OVOE7FOCFJ2"; // Thay bằng chuỗi bí mật của bạn
const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"; // URL sandbox
const vnp_ReturnUrl = "http://localhost:3037/order_received"; // URL trả về sau thanh toán

app.use(express.json());

// Tạo API để sinh liên kết thanh toán VNPay
app.post("/create_payment_url", (req, res) => {
  const { amount } = req.body; // Lấy số tiền từ request

  const ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: vnp_TmnCode,
    vnp_Locale: "vn",
    vnp_CurrCode: "VND",
    vnp_TxnRef: moment().format("YYYYMMDDHHmmss"),
    vnp_OrderInfo: "Thanh toán đơn hàng",
    vnp_OrderType: "billpayment",
    vnp_Amount: amount * 100, // VNPay yêu cầu nhân với 100
    vnp_ReturnUrl: vnp_ReturnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: moment().format("YYYYMMDDHHmmss"),
  };

  // Tạo chuỗi ký tự và mã hóa bằng HMAC SHA512
  const sortedParams = querystring.stringify(vnp_Params, { encode: false });
  const signData = crypto
    .createHmac("sha512", vnp_HashSecret)
    .update(sortedParams)
    .digest("hex");

  const paymentUrl = `${vnp_Url}?${sortedParams}&vnp_SecureHash=${signData}`;
  res.json({ paymentUrl });
});

// Khởi chạy server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
