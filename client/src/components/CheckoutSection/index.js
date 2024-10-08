import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import axios from "axios";
import { Link } from "react-router-dom";
import { totalPrice } from "../../utils";

// images

import "./style.scss";

const CheckoutSection = ({ cartList }) => {
  // State to manage form inputs and toggles
  const [tabs, setExpanded] = React.useState({
    cupon: false,
    billing_address: false,
    payment: true,
  });
  const [forms, setForms] = React.useState({
    cupon_key: "",
    fname: "",
    lname: "",
    address: "",
    email: "",
    phone: "",
    note: "",
    payment_method: "vnpay", // Default to VNPay
  });

  // Handle tab toggling
  function faqHandler(name) {
    setExpanded((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  }

  // Handle form changes
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForms((prevForms) => ({
      ...prevForms,
      [name]: value,
    }));
  };

  // Handle VNPay payment
  const handleVNPayPayment = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/create_payment_url",
        {
          params: {
            amount: totalPrice(cartList),
          },
        }
      );
      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl; // Redirect to VNPay payment page
      }
    } catch (error) {
      console.error("Error generating VNPay payment URL:", error);
    }
  };

  return (
    <Fragment>
      <Grid className="checkoutWrapper section-padding">
        <Grid className="container" container spacing={3}>
          <Grid item md={6} xs={12}>
            <div className="check-form-area">
              {/* Coupon Code Section */}
              <Grid className="cuponWrap checkoutCard">
                <Button
                  className="collapseBtn"
                  fullWidth
                  onClick={() => faqHandler("cupon")}
                >
                  Have a coupon? Click here to enter your code.
                </Button>
                <Collapse in={tabs.cupon} timeout="auto" unmountOnExit>
                  <Grid className="chCardBody">
                    <p>If you have a coupon code, please apply it</p>
                    <form className="cuponForm">
                      <TextField
                        fullWidth
                        type="text"
                        className="formInput radiusNone"
                        value={forms.cupon_key}
                        name="cupon_key"
                        onChange={(e) => changeHandler(e)}
                      />
                      <Button className="cBtn cBtnBlack">Apply</Button>
                    </form>
                  </Grid>
                </Collapse>
              </Grid>

              {/* Billing Address Section */}
              <Grid className="cuponWrap checkoutCard">
                <Button
                  className="collapseBtn"
                  fullWidth
                  onClick={() => faqHandler("billing_address")}
                >
                  Billing Address
                </Button>
                <Collapse
                  in={tabs.billing_address}
                  timeout="auto"
                  unmountOnExit
                >
                  <Grid className="chCardBody">
                    <form className="billingForm">
                      <Grid container spacing={3}>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullWidth
                            label="First Name"
                            name="fname"
                            value={forms.fname}
                            onChange={changeHandler}
                            type="text"
                            InputLabelProps={{ shrink: true }}
                            className="formInput radiusNone"
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullWidth
                            label="Last Name"
                            name="lname"
                            value={forms.lname}
                            onChange={changeHandler}
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
                            label="Address"
                            name="address"
                            value={forms.address}
                            onChange={changeHandler}
                            type="text"
                            InputLabelProps={{ shrink: true }}
                            className="formInput radiusNone"
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            value={forms.email}
                            onChange={changeHandler}
                            type="email"
                            InputLabelProps={{ shrink: true }}
                            className="formInput radiusNone"
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullWidth
                            label="Phone No"
                            name="phone"
                            value={forms.phone}
                            onChange={changeHandler}
                            type="text"
                            InputLabelProps={{ shrink: true }}
                            className="formInput radiusNone"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            multiline
                            label="Order Notes"
                            placeholder="Note about your order"
                            name="note"
                            value={forms.note}
                            onChange={changeHandler}
                            type="text"
                            InputLabelProps={{ shrink: true }}
                            className="formInput radiusNone note"
                          />
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </Collapse>
              </Grid>

              {/* Payment Method Section */}
              <Grid className="cuponWrap checkoutCard">
                <Button
                  className="collapseBtn"
                  fullWidth
                  onClick={() => faqHandler("payment")}
                >
                  Payment Method
                </Button>
                <Grid className="chCardBody">
                  <Collapse in={tabs.payment} timeout="auto">
                    <RadioGroup
                      className="paymentMethod"
                      aria-label="Payment Method"
                      name="payment_method"
                      value={forms.payment_method}
                      onChange={changeHandler}
                    >
                      <FormControlLabel
                        value="vnpay"
                        control={<Radio color="primary" />}
                        label="Pay with VNPay"
                      />
                      <FormControlLabel
                        value="cod"
                        control={<Radio color="primary" />}
                        label="Cash on Delivery"
                      />
                    </RadioGroup>

                    {/* VNPay Payment Option */}
                    {forms.payment_method === "vnpay" && (
                      <Grid className="cardType">
                        <Link
                          to="/order_received"
                          className="cBtn cBtnLarge cBtnTheme mt-20 ml-15"
                        >
                          Proceed to VNPay Payment
                        </Link>
                      </Grid>
                    )}

                    {/* Cash on Delivery Option */}
                    {forms.payment_method === "cod" && (
                      <Grid className="cardType">
                        <Link
                          to="/order_received"
                          className="cBtn cBtnLarge cBtnTheme mt-20 ml-15"
                        >
                          Proceed to Checkout
                        </Link>
                      </Grid>
                    )}
                  </Collapse>
                </Grid>
              </Grid>
            </div>
          </Grid>

          {/* Cart Summary Section */}
          <Grid item md={6} xs={12}>
            <Grid className="cartStatus">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Grid className="cartTotals">
                    <h4>Cart Total</h4>
                    <Table>
                      <TableBody>
                        {cartList.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              {item.title} ${item.price} x {item.qty}
                            </TableCell>
                            <TableCell align="right">
                              ${item.qty * item.price}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="totalProduct">
                          <TableCell>Total product</TableCell>
                          <TableCell align="right">{cartList.length}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Sub Price</TableCell>
                          <TableCell align="right">
                            ${totalPrice(cartList)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Total Price</TableCell>
                          <TableCell align="right">
                            ${totalPrice(cartList)}
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
