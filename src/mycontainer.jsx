/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import config from "config";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Generalhome from "./client/components/home/general/generalhome";
import Booking from "./client/components/patients/booking/booking1"; 
import SearchDoctor from "./client/components/pages/searchdoctor/search-doctor1";
import LoginContainer from "./client/components/login/login";
import ForgotPassword2 from "./client/components/pages/authentication/forgot-password2";
import LoginEmail from "./client/components/pages/authentication/login-email";
import LoginPhone from "./client/components/pages/authentication/login-phone";
import LoginEmailOtp from "./client/components/pages/authentication/login-email-otp";
import LoginPhoneOtp from "./client/components/pages/authentication/login-phone-otp";
import EmailOtp from "./client/components/pages/authentication/email-otp";
import MobileOtp from "./client/components/pages/authentication/phone-otp";
import PatientSignup from "./client/components/pages/authentication/patient-signup";
import DoctorSignup from "./client/components/pages/authentication/doctor-signup";
import SuccessSignup from "./client/components/pages/authentication/success-signup";
import Signup from "./client/components/pages/authentication/signup";
import Register from "./client/components/register/register";
import ForgotPassword from "./client/components/forgot-password";
import DoctorProfile from "./client/components/patients/doctorprofile"; 
import Home from "./client/components/home";
import Checkout from "./client/components/patients/checkout"; 
import InvoiceView from "./client/components/pages/invoices/view";
import BookingSuccess from "./client/components/patients/booking-success"; 
import Dashboard from "./client/components/patients/dashboard";
import Consultation from "./client/components/home/consultation";
import pagenotfound from "./client/components/pages/pagenotfound/pagenotfound";
import Favourties from "./client/components/patients/dashboard/favourties";

import PatientDependent from "./client/components/patients/dependent";

const MyContainer = function (props) {
  // const config = "/react/template/";
  if (props) {
    const url = props.location.pathname.split("/")[1];

    useEffect(() => {
      const handleMouseMove = (event) => {
        const cursorInner = document.querySelector(".cursor-inner");
        const cursorOuter = document.querySelector(".cursor-outer");

        if (cursorOuter) {
          cursorOuter.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
        }

        if (cursorInner) {
          cursorInner.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
        }
      };

      const handleMouseEnter = () => {
        const cursorInner = document.querySelector(".cursor-inner");
        const cursorOuter = document.querySelector(".cursor-outer");

        if (cursorInner) {
          cursorInner.classList.add("s");
        }

        if (cursorOuter) {
          cursorOuter.classList.add("s");
        }
      };

      const handleMouseLeave = (event) => {
        const cursorInner = document.querySelector(".cursor-inner");
        const cursorOuter = document.querySelector(".cursor-outer");

        if (
          event.target.tagName !== "A" ||
          !event.target.closest(".cursor-pointer")
        ) {
          if (cursorInner) {
            cursorInner.classList.remove("cursor-hover");
          }

          if (cursorOuter) {
            cursorOuter.classList.remove("cursor-hover");
          }
        }
      };

      document.body.addEventListener("mousemove", handleMouseMove);
      document.body.addEventListener("mouseenter", handleMouseEnter);
      document.body.addEventListener("mouseleave", handleMouseLeave);

      const cursorInner = document.querySelector(".cursor-inner");
      const cursorOuter = document.querySelector(".cursor-outer");

      if (cursorInner) {
        cursorInner.style.visibility = "visible";
      }

      if (cursorOuter) {
        cursorOuter.style.visibility = "visible";
      }

      return () => {
        document.body.removeEventListener("mousemove", handleMouseMove);
        document.body.removeEventListener("mouseenter", handleMouseEnter);
        document.body.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, []);

    return (
      <Router basename={`${config.publicPath}`}>
        <Switch>
          <Route path="/" exact component={Generalhome} />
          {/* <Route path="/patient/booking" exact component={Booking} /> */}
          <Route path="/login" exact component={LoginContainer} />
              <Route path="/register" exact component={Register} />
              <Route
                path="/pages/forgot-password"
                exact
                component={ForgotPassword}
              />
              <Route
                path="/pages/forgot-password2"
                exact
                component={ForgotPassword2}
              />
              <Route path="/pages/login-email" exact component={LoginEmail} />
              <Route path="/pages/login-phone" exact component={LoginPhone} />
              <Route path="/pages/email-otp" exact component={LoginEmailOtp} />
              <Route path="/pages/phone-otp" exact component={LoginPhoneOtp} />
              <Route path="/pages/eotp" exact component={EmailOtp} />
              <Route path="/pages/motp" exact component={MobileOtp} />

              <Route
                path="/pages/patient-signup"
                exact
                component={PatientSignup}
              />
              <Route
                path="/pages/doctor-signup"
                exact
                component={DoctorSignup}
              />
              <Route path="/success-signup" exact component={SuccessSignup} />
              <Route path="/index-2" exact component={Home} />
              <Route path="/signup" exact component={Signup} />
          <Route
                path="/patient/search-doctor1"
                exact
                component={SearchDoctor}
              />
                <Route path="/patient/booking1" exact component={Booking} />
                <Route
                path="/patient/doctor-profile"
                exact
                component={DoctorProfile}
              />
              <Route path="/patient/checkout" exact component={Checkout} />
              <Route
                path="/patient/booking-success"
                exact
                component={BookingSuccess}
              />
              <Route path="/pages/invoice-view" exact component={InvoiceView} />
              <Route path="/index" exact component={Generalhome} />
              <Route path="/patient/dashboard" exact component={Dashboard} />
              <Route path="/consultation" exact component={Consultation} />
              <Route path="/patient/favourites" exact component={Favourties} />
              <Route path="/patient/dependent" exact component={PatientDependent}/>
              
              <Route path="/pages/invoice-view" exact component={InvoiceView} />
              <Route path="*" exact component={pagenotfound} />
        </Switch>
      </Router>
    );
  }
  return null;
};

export default MyContainer;
