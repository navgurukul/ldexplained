import React, { useEffect, useState } from "react";
import loginBanner from "../../assets/images/login-banner.png";
import { Link, useHistory } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import { userRequestLdExplained } from "../../../../requestMethod";
import toast from "react-hot-toast";
import Cookies from 'universal-cookie';


// const config = "/react/template/";

const LoginContainer = (props) => {
  // const history = useHistory();
  const [values, setValues] = React.useState({});
  const cookies = new Cookies(null, { path: '/' });
  const history = useHistory();

  useEffect(() => {
    document.body.classList.add("account-page");

    return () => document.body.classList.remove("account-page");
  }, []);

  const handleSubmit =  async(e) => {
    e.preventDefault();
    toast.loading("Loging in...")
    const response = await userRequestLdExplained.post("/google/simple-login", values);
    toast.remove()
    if (response.data.constructor.prototype == String()){
      return toast.error(response.data)
    }
    cookies.set('token', response.data.token);
    toast.success("Login successful")
    history.push("/patient/dashboard")
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <Header {...props} />

      <>
        {/* Page Content */}
        <div className="content top-space">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                {/* Login Tab Content */}
                <div className="account-content">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-md-7 col-lg-6 login-left">
                      <img
                        src={loginBanner}
                        className="img-fluid"
                        alt="Doccure Login"
                      />
                    </div>
                    <div className="col-md-12 col-lg-6 login-right">
                      <div className="login-header">
                        <h3>
                          Login <span>Doccure</span>
                        </h3>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group form-focus">
                          <input
                            type="email"
                            name="email"
                            required
                            onChange={handleChange}
                            className="form-control floating"
                          />
                          <label className="focus-label">Email</label>
                        </div>
                        <div className="form-group form-focus">
                          <input
                            type="password"
                            name="password"
                            required
                            onChange={handleChange}
                            className="form-control floating"
                          />
                          <label className="focus-label">Password</label>
                        </div>
                        <div className="text-end">
                          <Link
                            className="forgot-link"
                            to="/pages/forgot-password"
                          >
                            Forgot Password ?
                          </Link>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary w-100 btn-lg login-btn"
                        >
                          Login
                        </button>
                        <div className="login-or">
                          <span className="or-line" />
                          <span className="span-or">or</span>
                        </div>
                        <div className="row form-row social-login">
                          <div className="col-6">
                            <Link
                              to="/index"
                              className="btn btn-facebook w-100"
                            >
                              <i className="fab fa-facebook-f me-1" /> Login
                            </Link>
                          </div>
                          <div className="col-6">
                            <Link to="/index" className="btn btn-google w-100">
                              <i className="fab fa-google me-1" /> Login
                            </Link>
                          </div>
                        </div>
                        <div className="text-center dont-have">
                          Don’t have an account?{" "}
                          <Link to="/register">Register</Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* /Login Tab Content */}
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </>

      <Footer {...props} />
    </>
  );
};

export default LoginContainer;
