import React from "react";
import DashboardSidebar from "../sidebar/sidebar.jsx";
import StickyBox from "react-sticky-box";
import Footer from "../../../footer";
import { Link } from "react-router-dom";
import Header from "../../../header.jsx";
import toast from "react-hot-toast";
import { userRequestLdExplained } from "../../../../../../requestMethod.js";
import Cookies from "universal-cookie";

const Password = (props) => {
  const [values, setValues] = React.useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Updating passowrd...");
    const response = await userRequestLdExplained.put(
      "/google/update-password",
      values,
      {
        headers: {
          Authorization: new Cookies(null, { path: "/" }).get("token"),
        },
      }
    );
    toast.remove();
    if (response.data.statusCode == 400) {
      return toast.error(response.data.message);
    }
    toast.success("Passwword updated successfully");
    setValues({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div>
      <Header {...props} />
      <div className="breadcrumb-bar-two">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <h2 className="breadcrumb-title">Change Password</h2>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/index-2">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Change Password
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
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Old Password</label>
                      <input
                        required
                        name="old_password"
                        onChange={handleChange}
                        type="password"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        required
                        name="new_password"
                        onChange={handleChange}
                        type="password"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        required
                        name="confirm_password"
                        onChange={handleChange}
                        type="password"
                        className="form-control"
                      />
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        Update Password
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

export default Password;
