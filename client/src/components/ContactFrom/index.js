import React, { Component } from "react";
import emailjs from "emailjs-com";

class ContactForm extends Component {
  state = {
    name: "",
    email: "",
    subject: "",
    lastname: "",
    message: "",
    error: {},
  };

  componentDidMount() {
    // Khởi tạo EmailJS với public key của bạn
    emailjs.init("vKP5GXWIpSAKa_L24"); // Thay thế bằng public key EmailJS của bạn
  }

  changeHandler = (e) => {
    const error = this.state.error;
    error[e.target.name] = "";

    this.setState({
      [e.target.name]: e.target.value,
      error,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();

    const { name, email, subject, lastname, message, error } = this.state;

    // Kiểm tra các trường thông tin
    if (name === "") error.name = "Vui lòng nhập tên của bạn";
    if (email === "") error.email = "Vui lòng nhập email của bạn";
    if (subject === "") error.subject = "Vui lòng nhập chủ đề";
    if (lastname === "") error.lastname = "Vui lòng nhập họ của bạn";
    if (message === "") error.message = "Vui lòng nhập tin nhắn";

    if (
      error.name ||
      error.email ||
      error.subject ||
      error.lastname ||
      error.message
    ) {
      this.setState({ error });
      return;
    }

    // Gửi email qua EmailJS
    emailjs
      .sendForm(
        "service_z5nlp0l", // Thay thế bằng service ID của bạn
        "template_bakueop", // Thay thế bằng template ID của bạn
        e.target,
        "vKP5GXWIpSAKa_L24" // Thay thế bằng public key của bạn
      )
      .then(
        (result) => {
          console.log(result.text);
          this.setState({
            name: "",
            email: "",
            subject: "",
            lastname: "",
            message: "",
            error: {},
          });
          alert("Tin nhắn đã được gửi thành công!"); // Thông báo khi gửi thành công
        },
        (error) => {
          console.log(error.text);
          alert("Gửi tin nhắn thất bại. Vui lòng thử lại sau."); // Thông báo khi gửi thất bại
        }
      );
  };

  render() {
    const { name, email, subject, lastname, message, error } = this.state;

    return (
      <form onSubmit={this.submitHandler} className="form">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12">
            <div className="form-field">
              <input
                value={name}
                onChange={this.changeHandler}
                type="text"
                name="name"
                placeholder="Tên"
                required
              />
              <p>{error.name ? error.name : ""}</p>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="form-field">
              <input
                value={lastname}
                onChange={this.changeHandler}
                type="text"
                name="lastname"
                placeholder="Họ"
                required
              />
              <p>{error.lastname ? error.lastname : ""}</p>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="form-field">
              <input
                value={email}
                onChange={this.changeHandler}
                type="email"
                name="email"
                placeholder="Email"
                required
              />
              <p>{error.email ? error.email : ""}</p>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="form-field">
              <input
                value={subject}
                onChange={this.changeHandler}
                type="text"
                name="subject"
                placeholder="Chủ đề"
                required
              />
              <p>{error.subject ? error.subject : ""}</p>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-field">
              <textarea
                value={message}
                onChange={this.changeHandler}
                name="message"
                placeholder="Tin nhắn"
                required
              ></textarea>
              <p>{error.message ? error.message : ""}</p>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-submit">
              <button type="submit" className="theme-btn">
                Gửi Tin Nhắn
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default ContactForm;
