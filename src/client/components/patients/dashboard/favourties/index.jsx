import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardSidebar from "../sidebar/sidebar.jsx";
import StickyBox from "react-sticky-box";
import {
  IMG01,
  IMG02,
  IMG03,
  IMG04,
  IMG05,
  IMG06,
  IMG07,
  IMG08,
  IMG09,
} from "./img";

import Footer from "../../../footer";
import Header from "../../../header.jsx";
import { userRequestLdExplained } from "../../../../../../requestMethod.js";
import Cookies from "universal-cookie";

const Favourites = (props) => {
  const [doctors, setDoctors] = useState([]);
  const token = new Cookies(null, { path: '/' }).get("token");


  const loadDoctors = () => {
    const response = userRequestLdExplained.get("/favouriteDoctors/parents", {
      headers: {
        Authorization: token,
      },
    });
    response.then((res) => {
      setDoctors(res.data);
    });
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const removeFavourite = (doctorId) => {
    userRequestLdExplained
      .delete("/favouriteDoctors/parents", {
        data: { dr_id: doctorId },
        headers: {
          Authorization: token,
        },
      })
      .then((res) => loadDoctors());
  };

  return (
    <div>
      <Header {...props} />
      <div className="breadcrumb-bar-two">
        <div className="container">
          <div className="row align-items-center  inner-banner">
            <div className="col-md-12 col-12 text-center">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <h2 className="breadcrumb-title">Favourites</h2>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/index-2">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Favourites
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              <StickyBox offsetTop={20} offsetBottom={20}>
                <DashboardSidebar />
              </StickyBox>
            </div>
            <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="row row-grid">
                {doctors.map((doctor) => (
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="profile-widget">
                      <div className="doc-img">
                        <Link to="/patient/doctor-profile">
                          <img
                            className="img-fluid"
                            alt="User"
                            onError={(e) => (e.target.src = IMG01)}
                            src={doctor.profile_link || IMG01}
                          />
                        </Link>
                        <button
                          onClick={() => removeFavourite(doctor.id)}
                          to="#0"
                          className="fav-btn"
                        >
                          <i className="far fa-bookmark"></i>
                        </button>
                      </div>
                      <div className="pro-content">
                        <h3 className="title">
                          <Link to="/patient/doctor-profile">
                            {doctor.name}
                          </Link>
                          <i className="fas fa-check-circle verified"></i>
                        </h3>
                        <p className="speciality">
                          {doctor.specialization
                            .map((item) => item.specialization)
                            .join(", ")}
                        </p>
                        <div className="rating">
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <span className="d-inline-block average-rating ms-1">
                            (17)
                          </span>
                        </div>
                        <ul className="available-info">
                          <li>
                            <i className="fas fa-map-marker-alt"></i>{" "}
                            {doctor.city} , {doctor.state}
                          </li>
                          <li>
                            <i className="far fa-clock"></i> Available on Fri,
                            22 Mar
                          </li>
                          <li>
                            <i className="far fa-money-bill-alt"></i> ₹
                            {doctor.booking_fee || 0}{" "}
                            <i
                              className="fas fa-info-circle"
                              data-bs-toggle="tooltip"
                              title="Lorem Ipsum"
                            ></i>
                          </li>
                        </ul>
                        <div className="row row-sm">
                          <div className="col-6">
                            <Link
                              to="/patient/doctor-profile"
                              className="btn view-btn"
                            >
                              View Profile
                            </Link>
                          </div>
                          <div className="col-6">
                            <Link
                              to="/patient/booking1"
                              className="btn book-btn"
                            >
                              Book Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer {...props} />
    </div>
  );
};

export default Favourites;
