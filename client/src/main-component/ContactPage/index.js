import React, { Fragment } from "react";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/pagetitle";
import Contactpage from "../../components/Contactpage";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";

const ContactPage = () => {
  return (
    <Fragment>
      <Navbar hClass={"header-style-2"} />
      <PageTitle pageTitle={"Liên Hệ Chúng Tôi"} pagesub={"Liên Hệ"} />
      <Contactpage />
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default ContactPage;
