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
    // Initialize EmailJS with your public key
    emailjs.init("vKP5GXWIpSAKa_L24"); // Replace with your EmailJS public key
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

    // Validate fields
    if (name === "") error.name = "Please enter your name";
    if (email === "") error.email = "Please enter your email";
    if (subject === "") error.subject = "Please enter your subject";
    if (lastname === "") error.lastname = "Please enter your lastname";
    if (message === "") error.message = "Please enter your message";

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

    // Send email via EmailJS
    emailjs
      .sendForm(
        "service_z5nlp0l", // Replace with your EmailJS service ID
        "template_bakueop", // Replace with your EmailJS template ID
        e.target,
        "vKP5GXWIpSAKa_L24" // Replace with your EmailJS public key
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
          alert("Message sent successfully!"); // Show a success message
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send message. Please try again later."); // Show an error message
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
                placeholder="Name"
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
                placeholder="Lastname"
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
                placeholder="Subject"
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
                placeholder="Message"
                required
              ></textarea>
              <p>{error.message ? error.message : ""}</p>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-submit">
              <button type="submit" className="theme-btn">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default ContactForm;
