import React from "react";
import ContactForm from "../ContactFrom";

const Contactpage = () => {
  return (
    <section className="contact-pg-contact-section section-padding">
      <div className="container">
        <div className="row">
          <div className="col col-lg-6 col-12">
            <div className="section-title-s3 section-title-s5">
              <h2>Our Contacts</h2>
            </div>
            <div className="contact-details">
              <p>
                At Megift, we specialize in offering high-quality, handcrafted
                jewelry pieces designed to bring elegance and beauty to your
                life. Our passion for unique designs ensures that every piece is
                crafted with care and precision.
              </p>

              <ul>
                <li>
                  <div className="icon">
                    <i className="ti-location-pin"></i>
                  </div>
                  <h5>Our Location</h5>
                  <p>
                    Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức,
                    Hồ Chí Minh
                  </p>
                </li>
                <li>
                  <div className="icon">
                    <i className="ti-mobile"></i>
                  </div>
                  <h5>Phone</h5>
                  <p>+84 822 882 419</p>
                </li>
                <li>
                  <div className="icon">
                    <i className="ti-email"></i>
                  </div>
                  <h5>Email</h5>
                  <p>megift.ladia@gmail.com</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="col col-lg-6 col-12">
            <div className="contact-form-area">
              <div className="section-title-s3 section-title-s5">
                <h2>Quick Contact Form</h2>
              </div>
              <div className="contact-form">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-xs-12">
            <div className="contact-map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6100105370124!2d106.80730807480579!3d10.841127589311634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1728445244463!5m2!1sen!2s"></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contactpage;
