const qs = require("qs");
const CryptoJS = require("crypto-js");

const vnpayConfig = {
  tmnCode: "HFANROC2", // Terminal ID
  secretKey: "6P3XBJYOBU8UT2DD7HB97OVOE7FOCFJ2", // Your Secret Key
};

// Parameters to simulate the request to VNPay
let vnp_Params = {
  vnp_Version: "2.1.0",
  vnp_Command: "pay",
  vnp_TmnCode: vnpayConfig.tmnCode,
  vnp_Amount: 1000000, // Example amount (1,000,000 VND)
  vnp_CreateDate: "20241017094120", // Example create date (YYYYMMDDHHmmss)
  vnp_CurrCode: "VND",
  vnp_IpAddr: "127.0.0.1", // IP address for local development
  vnp_Locale: "vn",
  vnp_OrderInfo: "Thanh toan test", // Example order info
  vnp_OrderType: "billpayment", // Order type
  vnp_ReturnUrl: "http://localhost:3000/order_received", // Example return URL
  vnp_TxnRef: "order_123456789", // Example order reference
};

// Sort the parameters alphabetically
vnp_Params = Object.keys(vnp_Params)
  .sort()
  .reduce((result, key) => {
    result[key] = vnp_Params[key];
    return result;
  }, {});

// Create the query string
const querystring = qs.stringify(vnp_Params, { encode: false });
console.log("Query string before hashing: ", querystring);

// Generate the HMAC SHA512 signature
const signData = CryptoJS.HmacSHA512(
  querystring,
  vnpayConfig.secretKey
).toString(CryptoJS.enc.Hex);
console.log("Generated vnp_SecureHash: ", signData);
