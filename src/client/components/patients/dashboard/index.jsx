/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardSidebar } from "./sidebar/sidebar.jsx";
// import { Tab, Tabs } from "react-bootstrap";
import StickyBox from "react-sticky-box";
import { IMG01 } from "./img";

import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import DatePicker from "react-datepicker";
import Footer from "../../footer";
import Header from "../../header.jsx";
import { userRequestLdExplained } from "../../../../../requestMethod.js";
import moment from 'moment';
import Cookies from "universal-cookie";

const Dashboard = (props) => {
  const [appoiments, setAppoiments] = useState([]);
  const token = new Cookies(null, { path: '/' }).get("token");

  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const response = userRequestLdExplained.get("/bookingSlots/userId", {
      headers: {
        Authorization: token,
      },
    });
    response.then((res) => {
      setAppoiments(res.data);
    });
  }, []);

  return (
    <>
      <Header {...props} />
      {/* <!-- Breadcrumb --> */}
      <div className="breadcrumb-bar-two">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <h2 className="breadcrumb-title">Dashboard</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/index-2">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Dashboard
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Breadcrumb -->     */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              <StickyBox offsetTop={20} offsetBottom={20}>
                <DashboardSidebar />
              </StickyBox>
            </div>
            <div className="col-md-7 col-lg-8 col-xl-9">
              <div>
                <div className="row patient-graph-col">
                  <div
                    className="search-box-one aos"
                    data-aos="fade-up"
                    style={{
                      padding: "10px 20px",
                      width: "900px",
                      marginLeft: "130px",
                    }}
                  >
                    <span style={{ margin: "40px 0px" }}>
                      Book Appointment Form{" "}
                    </span>
                    <form action={`/patient/search-doctor1`}>
                      <div className="search-input search-line">
                        <i>
                          <FeatherIcon
                            icon="search"
                            style={{ width: "16px" }}
                          />
                        </i>
                        <div className="form-group mb-0">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search doctors, clinics, hospitals, etc"
                          />
                        </div>
                      </div>
                      <div className="search-input search-map-line">
                        <i>
                          <FeatherIcon
                            icon="map-pin"
                            style={{ width: "16px" }}
                          />
                        </i>
                        <div className="form-group mb-0" style={{}}>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Location"
                          />
                          <Link
                            className="current-loc-icon current_location"
                            to="#"
                          >
                            <i>
                              <FeatherIcon
                                icon="crosshair"
                                style={{ width: "16px" }}
                              />
                            </i>
                          </Link>
                        </div>
                      </div>
                      <div
                        className="search-input search-calendar-line"
                        style={{
                          width: "180px",
                        }}
                      >
                        <i>
                          <FeatherIcon icon={"calendar"} />
                        </i>
                        <div className="form-group mb-0">
                          <DatePicker
                            className="form-control datetimepicker"
                            selected={selectedDate}
                            onChange={handleDateChange}
                            placeholderText="Date"
                          />
                        </div>
                      </div>
                      <div
                        className="form-search-btn"
                        style={{ width: "150px" }}
                      >
                        <button
                          className="btn"
                          type="submit"
                          style={{ width: "100%" }}
                        >
                          Search Docter
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="card-body pt-5">
                <h1 className="text-lg py-3">Appoiments</h1>
                <div className="card card-table mb-0">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover table-center mb-0">
                        <thead>
                          <tr>
                            <th>Expert Name</th>
                            <th>Child's Name</th>
                            <th>Appoiment Date</th>
                            <th>Booking Date</th>
                            <th>Amount</th>
                            <th>Follow Up</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appoiments.map((appoiment) => (
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <Link
                                    to="/patient/doctor-profile"
                                    className="avatar avatar-sm me-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src={IMG01}
                                      alt="User"
                                    />
                                  </Link>
                                  <Link to="/patient/doctor-profile">
                                    {appoiment.expert_name}
                                    <span>Dental</span>
                                  </Link>
                                </h2>
                              </td>
                              <td>{appoiment.child_name}</td>
                              <td>{moment(appoiment.start_time).format("DD MMM YYYY")}</td>
                              <td>{moment(appoiment.booking_date).format("DD MMM YYYY")}</td>
                              <td>₹{appoiment?.amount || 0}</td>
                              <td> - </td>
                              <td>
                                <span className="badge rounded-pill bg-success-light">
                                  Confirm
                                </span>
                              </td>
                              <td className="text-end">
                                <div className="table-action">
                                  <Link
                                    to="#0"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </Link>
                                  &nbsp;
                                  <Link
                                    to="#0"
                                    className="btn btn-sm bg-primary-light"
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer {...props} />
    </>
  );
};

export default Dashboard;
