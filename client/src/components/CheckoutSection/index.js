import React, { Fragment, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import qs from "qs"; // Dùng để stringify các tham số truy vấn
import CryptoJS from "crypto-js"; // Để mã hóa HMAC SHA512
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Thư viện để gọi API
import "./style.scss";

const CheckoutSection = ({ cartList }) => {
  const navigate = useNavigate();
  const [userIp, setUserIp] = useState("127.0.0.1"); // Mặc định là localhost
  const [forms, setForms] = useState({
    fname: "",
    lname: "",
    address: "",
    email: "",
    phone: "",
    note: "",
    payment_method: "vnpay",
  });

  // Cấu hình VNPay (Sandbox)
  const vnpayConfig = {
    tmnCode: "HFANROC2", // Mã Terminal của bạn
    secretKey: "6P3XBJYOBU8UT2DD7HB97OVOE7FOCFJ2", // Secret key của bạn
    vnpayUrl: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html", // URL của VNPay test
    returnUrl: "http://localhost:3037/order_received", // URL trả về sau khi thanh toán
  };

  // Lấy địa chỉ IP từ dịch vụ bên ngoài (ipify)
  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setUserIp(response.data.ip); // Lưu địa chỉ IP thực
      } catch (error) {
        console.error("Lỗi khi lấy địa chỉ IP:", error);
      }
    };

    fetchIP();
  }, []);

  // Tính tổng giá trị từ giỏ hàng
  const totalPrice = (items) => {
    return items.reduce(
      (acc, item) =>
        acc + parseFloat(item.price.replace(/[,.]/g, "")) * item.qty,
      0
    );
  };

  // Tạo ngày hết hạn theo định dạng yêu cầu (YYYYMMDDHHmmss)
  const getExpireDate = () => {
    const now = new Date();
    const expireDate = new Date(now.getTime() + 15 * 60 * 1000); // Thêm 15 phút
    const year = expireDate.getFullYear();
    const month = String(expireDate.getMonth() + 1).padStart(2, "0");
    const day = String(expireDate.getDate()).padStart(2, "0");
    const hours = String(expireDate.getHours()).padStart(2, "0");
    const minutes = String(expireDate.getMinutes()).padStart(2, "0");
    const seconds = String(expireDate.getSeconds()).padStart(2, "0");
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  };

  // Tạo URL thanh toán VNPay
  const generateVNPayUrl = () => {
    const createDate = new Date();
    const orderId = `order_${createDate.getTime()}`;

    // Chuẩn bị các tham số gửi tới VNPay
    let vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: vnpayConfig.tmnCode,
      vnp_Amount: totalPrice(cartList) * 100, // Số tiền (đơn vị nhỏ nhất: VND)
      vnp_CreateDate: createDate
        .toISOString()
        .replace(/[-:T.]/g, "")
        .slice(0, 14), // Định dạng: YYYYMMDDHHmmss
      vnp_CurrCode: "VND",
      vnp_IpAddr: userIp, // Địa chỉ IP của người dùng
      vnp_Locale: "vn", // Locale: Tiếng Việt
      vnp_OrderInfo: `Thanh toan cho ${forms.fname} ${forms.lname}`, // Thông tin đơn hàng
      vnp_OrderType: "billpayment", // Loại đơn hàng
      vnp_ReturnUrl: vnpayConfig.returnUrl, // URL trả về sau thanh toán
      vnp_ExpireDate: getExpireDate(), // Ngày hết hạn của giao dịch
      vnp_TxnRef: orderId, // Mã giao dịch duy nhất
    };

    // Sắp xếp tham số theo thứ tự alphabet trước khi tạo chữ ký
    vnp_Params = Object.keys(vnp_Params)
      .sort()
      .reduce((result, key) => {
        result[key] = vnp_Params[key];
        return result;
      }, {});

    // Tạo chuỗi truy vấn từ các tham số
    const querystring = qs
      .stringify(vnp_Params, { encode: false })
      .replace(/\s+/g, "");

    // Tạo chữ ký HMAC SHA512 sử dụng secretKey
    const signData = CryptoJS.HmacSHA512(
      querystring,
      vnpayConfig.secretKey
    ).toString(CryptoJS.enc.Hex);

    // Tạo URL thanh toán đầy đủ
    const paymentUrl = `${vnpayConfig.vnpayUrl}?${querystring}&vnp_SecureHash=${signData}`;

    // Chuyển hướng người dùng tới URL thanh toán
    window.location.href = paymentUrl;
  };

  const handlePayment = () => {
    if (forms.payment_method === "vnpay") {
      generateVNPayUrl(); // Tạo URL thanh toán và chuyển hướng
    } else {
      navigate("/order_received"); // Xử lý COD
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForms((prevForms) => ({
      ...prevForms,
      [name]: value,
    }));
  };

  return (
    <Fragment>
      <Grid className="checkoutWrapper section-padding">
        <Grid className="container" container spacing={3}>
          <Grid item md={6} xs={12}>
            <div className="check-form-area">
              <Grid className="cuponWrap checkoutCard">
                <h4>Địa chỉ thanh toán</h4>
                <form className="billingForm">
                  <Grid container spacing={3}>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Tên"
                        name="fname"
                        value={forms.fname}
                        onChange={handleChange}
                        type="text"
                        InputLabelProps={{ shrink: true }}
                        className="formInput radiusNone"
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Họ"
                        name="lname"
                        value={forms.lname}
                        onChange={handleChange}
                        type="text"
                        InputLabelProps={{ shrink: true }}
                        className="formInput radiusNone"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows="3"
                        label="Địa chỉ"
                        name="address"
                        value={forms.address}
                        onChange={handleChange}
                        type="text"
                        InputLabelProps={{ shrink: true }}
                        className="formInput radiusNone"
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={forms.email}
                        onChange={handleChange}
                        type="email"
                        InputLabelProps={{ shrink: true }}
                        className="formInput radiusNone"
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Số điện thoại"
                        name="phone"
                        value={forms.phone}
                        onChange={handleChange}
                        type="text"
                        InputLabelProps={{ shrink: true }}
                        className="formInput radiusNone"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        label="Ghi chú đơn hàng"
                        placeholder="Ghi chú về đơn hàng của bạn"
                        name="note"
                        value={forms.note}
                        onChange={handleChange}
                        type="text"
                        InputLabelProps={{ shrink: true }}
                        className="formInput radiusNone note"
                      />
                    </Grid>
                  </Grid>
                </form>
              </Grid>

              <Grid className="cuponWrap checkoutCard">
                <h4>Phương thức thanh toán</h4>
                <RadioGroup
                  value={forms.payment_method}
                  name="payment_method"
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="vnpay"
                    control={<Radio color="primary" />}
                    label="Thanh toán qua VNPay"
                  />
                  <FormControlLabel
                    value="cod"
                    control={<Radio color="primary" />}
                    label="Thanh toán khi nhận hàng (COD)"
                  />
                </RadioGroup>
                <Button
                  className="cBtn cBtnLarge cBtnTheme mt-20"
                  onClick={handlePayment}
                >
                  {forms.payment_method === "vnpay"
                    ? "Tiến hành thanh toán VNPay"
                    : "Tiến hành thanh toán COD"}
                </Button>
              </Grid>
            </div>
          </Grid>

          <Grid item md={6} xs={12}>
            <Grid className="cartStatus">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Grid className="cartTotals">
                    <h4>Tổng giỏ hàng</h4>
                    <Table>
                      <TableBody>
                        {cartList.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              {item.title} {item.price} VND x {item.qty}
                            </TableCell>
                            <TableCell align="right">
                              {(
                                parseFloat(item.price.replace(/[,.]/g, "")) *
                                item.qty
                              ).toLocaleString()}{" "}
                              VND
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="totalProduct">
                          <TableCell>Tổng sản phẩm</TableCell>
                          <TableCell align="right">{cartList.length}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Giá tạm tính</TableCell>
                          <TableCell align="right">
                            {totalPrice(cartList).toLocaleString()} VND
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Tổng giá trị đơn hàng</TableCell>
                          <TableCell align="right">
                            {totalPrice(cartList).toLocaleString()} VND
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CheckoutSection;
