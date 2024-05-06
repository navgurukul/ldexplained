import React, { useEffect, useState } from "react";
import DashboardSidebar from "../sidebar/sidebar.jsx";
import IMG01 from "../../../../assets/images/patient.jpg";
import StickyBox from "react-sticky-box";
import { Link } from "react-router-dom";
import Footer from "../../../footer.jsx";
import Header from "../../../header.jsx";
import Cookies from "universal-cookie";
import { userRequestLdExplained } from "../../../../../../requestMethod.js";
import toast from "react-hot-toast";

const Profile = (props) => {
  const [user, setUser] = useState({});
  const token = new Cookies(null, { path: "/" }).get("token");

  useEffect(() => {
    const response = userRequestLdExplained.get("/user/children", {
      headers: {
        Authorization: token,
      },
    });
    response.then((res) => {
      const u = res.data[0];
      u.dob = new Date(u.dob).toISOString().split("T")[0];
      setUser(res.data[0]);
    });
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    toast.loading("Updating profile...");
    const updateData = user;
    delete updateData.id;
    delete updateData.last_updated;
    delete updateData.dated;
    delete updateData.password;
    Object.keys(updateData).forEach((key) => {
      if (!updateData[key]) {
        delete updateData[key];
      }
    });
    const response = await userRequestLdExplained.put(
      "/user/update-profile",
      updateData,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    toast.remove();
    if (response.data.statusCode === 400) {
      return toast.error(response.data.message);
    }
    toast.success("Profile updated successfully");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      <Header {...props} />
      <div className="breadcrumb-bar-two">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <h2 className="breadcrumb-title">Profile Settings</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/index-2">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Profile Settings
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
              <div className="card">
                <div className="card-body">
                  <form onSubmit={updateUser}>
                    <div className="row form-row">
                      <div className="col-12 col-md-12">
                        <div className="form-group">
                          <div className="change-avatar">
                            <div className="profile-img">
                              <img src={IMG01} alt="User" />
                            </div>
                            <div className="upload-img">
                              <div className="change-photo-btn">
                                <span>
                                  <i className="fa fa-upload"></i> Upload Photo
                                </span>
                                <input type="file" className="upload" />
                              </div>
                              <small className="form-text text-muted">
                                Allowed JPG, GIF or PNG. Max size of 2MB
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            onChange={handleChange}
                            defaultValue={user.name}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={user.last_name}
                            name="last_name"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Date of Birth</label>
                          <input
                            type="date"
                            className="form-control"
                            defaultValue={user.dob}
                            name="dob"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Blood Group</label>
                          <select
                            name="blood_group"
                            onChange={handleChange}
                            className="form-select form-control"
                          >
                            <option selected={user.blood_group == "A-"}>
                              A-
                            </option>
                            <option selected={user.blood_group == "A+"}>
                              A+
                            </option>
                            <option selected={user.blood_group == "B-"}>
                              B-
                            </option>
                            <option selected={user.blood_group == "B+"}>
                              B+
                            </option>
                            <option selected={user.blood_group == "AB-"}>
                              AB-
                            </option>
                            <option selected={user.blood_group == "AB+"}>
                              AB+
                            </option>
                            <option selected={user.blood_group == "O-"}>
                              O-
                            </option>
                            <option selected={user.blood_group == "O+"}>
                              O+
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Email ID</label>
                          <input
                            type="email"
                            className="form-control"
                            defaultValue={user.email}
                            name="email"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Mobile</label>
                          <input
                            type="text"
                            defaultValue={user.contact}
                            className="form-control"
                            name="contact"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label>Address</label>
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            onChange={handleChange}
                            defaultValue={user.address}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>City</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={user.city}
                            name="city"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>State</label>
                          <input
                            type="text"
                            className="form-control"
                            name="state"
                            onChange={handleChange}
                            defaultValue={user.state}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Zip Code</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={user.zipcodes}
                            name="zipcodes"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Country</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={user.country}
                            name="country"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer {...props} />
    </div>
  );
};

export default Profile;
