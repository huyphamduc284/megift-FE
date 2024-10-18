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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "./style.scss";

const CheckoutSection = ({ cartList }) => {
  const navigate = useNavigate();
  const [forms, setForms] = useState({
    fname: "",
    lname: "",
    address: "",
    email: "",
    phone: "",
    note: "",
    payment_method: "vnpay", // Phương thức mặc định là VNPay
  });

  // Tỷ giá quy đổi từ VND sang USD
  const exchangeRate = 24000; // 1 USD = 24,000 VND

  // Lấy IP người dùng (không bắt buộc nhưng có thể hữu ích)
  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        console.log("User IP:", response.data.ip); // Bạn có thể lưu hoặc sử dụng thông tin IP ở đây
      } catch (error) {
        console.error("Lỗi khi lấy địa chỉ IP:", error);
      }
    };
    fetchIP();
  }, []);

  // Tính tổng giá trị đơn hàng theo VND
  const totalPrice = (items) => {
    return items.reduce(
      (acc, item) =>
        acc + parseFloat(item.price.replace(/[,.]/g, "")) * item.qty,
      0
    );
  };

  // Tính tổng giá trị đơn hàng sau khi quy đổi từ VND sang USD
  const totalPriceInUSD = (items) => {
    const totalVND = totalPrice(items);
    return (totalVND / exchangeRate).toFixed(2); // Quy đổi sang USD và làm tròn 2 chữ số
  };

  // Xử lý thay đổi form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForms((prevForms) => ({
      ...prevForms,
      [name]: value,
    }));
  };

  // Xử lý thanh toán
  const handlePayment = () => {
    console.log(forms.payment_method);
    if (forms.payment_method === "paypal") {
      // PayPal xử lý trực tiếp
    } else if (forms.payment_method === "vnpay") {
      // Xử lý thanh toán VNPay ở đây
    } else {
      navigate("/order_received");
    }
  };

  return (
    <Fragment>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AadMsHGcnPI6LDdYfG2-gI6Z6Brii6CnqknEPPCMXPCgl8V8XTDj16o_Jz9xrQL12TZnTG6VFaa8VkkC", // Thay thế bằng client-id thực của bạn
          currency: "USD", // Đơn vị tiền tệ USD
        }}
      >
        <Grid className="checkoutWrapper section-padding">
          <Grid className="container" container spacing={3}>
            <Grid item md={6} xs={12}>
              <div className="check-form-area">
                <Grid className="cuponWrap checkoutCard">
                  <h4>Địa chỉ thanh toán</h4>
                  <form className="billingForm">
                    <Grid container spacing={3}>
                      {/* Các trường nhập thông tin khách hàng */}
                      <Grid item sm={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Tên"
                          name="fname"
                          value={forms.fname}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Họ"
                          name="lname"
                          value={forms.lname}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Địa chỉ"
                          name="address"
                          value={forms.address}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          value={forms.email}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Số điện thoại"
                          name="phone"
                          value={forms.phone}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          label="Ghi chú đơn hàng"
                          name="note"
                          value={forms.note}
                          onChange={handleChange}
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
                      value="paypal"
                      control={<Radio color="primary" />}
                      label="Thanh toán qua PayPal"
                    />
                    <FormControlLabel
                      value="cod"
                      control={<Radio color="primary" />}
                      label="Thanh toán khi nhận hàng (COD)"
                    />
                  </RadioGroup>

                  {/* Nút thanh toán PayPal */}
                  {forms.payment_method === "paypal" && (
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: totalPriceInUSD(cartList), // Sử dụng tổng tiền đã quy đổi sang USD
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                          alert(
                            "Thanh toán thành công bởi " +
                              details.payer.name.given_name
                          );
                          navigate("/order_received");
                        });
                      }}
                    />
                  )}

                  <Button
                    className="cBtn cBtnLarge cBtnTheme mt-20"
                    onClick={handlePayment}
                  >
                    {forms.payment_method === "vnpay"
                      ? "Tiến hành thanh toán VNPay"
                      : forms.payment_method === "paypal"
                      ? "Thanh toán PayPal"
                      : "Thanh toán COD"}
                  </Button>
                </Grid>
              </div>
            </Grid>

            {/* Hiển thị thông tin giỏ hàng */}
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
                            <TableCell align="right">
                              {cartList.length}
                            </TableCell>
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
                          <TableRow>
                            <TableCell>Giá trị đơn hàng sau quy đổi</TableCell>
                            <TableCell align="right">
                              {totalPriceInUSD(cartList)} USD
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
      </PayPalScriptProvider>
    </Fragment>
  );
};

export default CheckoutSection;
