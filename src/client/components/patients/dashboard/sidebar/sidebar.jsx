import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IMG01 from "../../../../assets/images/patient.jpg";
import { userRequestLdExplained } from "../../../../../../requestMethod";
import moment from "moment";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

export const DashboardSidebar = () => {
  const [parent, setParent] = useState({});
  const pathname = window.location.pathname;
  const token = new Cookies(null, { path: "/" }).get("token");
  const history = useHistory();

  useEffect(() => {
    const response = userRequestLdExplained.get("/user/children", {
      headers: {
        Authorization: token,
      },
    });
    response.then((res) => {
      setParent(res.data[0]);
    });
  }, []);

  const handleLogout = () => {
    new Cookies(null, { path: "/" }).remove("token");
    history.push("/login");
  };

  return (
    <div className="profile-sidebar">
      <div className="widget-profile pro-widget-content">
        <div className="profile-info-widget">
          <Link to="#0" className="booking-doc-img">
            <img src={parent.profile_url || IMG01} alt="User" />
          </Link>
          <div className="profile-det-info">
            <h3>{parent.name}</h3>
            <div className="patient-details">
              <h5>
                <i className="fas fa-birthday-cake"></i>{" "}
                {parent.dob && moment(parent.dob).format("DD MMM YYYY")}
              </h5>
              <h5 className="mb-0">
                <i className="fas fa-map-marker-alt"></i> {parent.city},{" "}
                {parent.state}
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-widget">
        <nav className="dashboard-menu">
          <ul>
            <li className={pathname.includes("/dashboard") ? "active" : ""}>
              <Link to="/patient/dashboard">
                <i className="fas fa-columns"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li className={pathname.includes("/dependent") ? "active" : ""}>
              <Link to="/patient/dependent">
                <i className="fas fa-users"></i>
                <span>My Children</span>
              </Link>
            </li>
            <li className={pathname.includes("/favourites") ? "active" : ""}>
              <Link to="/patient/favourites">
                <i className="fas fa-bookmark"></i>{" "}
                <span>Favourites Experts</span>
              </Link>
            </li>
            <li className={pathname.includes("/profile") ? "active" : ""}>
              <Link to="/patient/profile">
                <i className="fas fa-user-cog"></i>
                <span>Profile Settings</span>
              </Link>
            </li>
            <li
              className={pathname.includes("/change-password") ? "active" : ""}
            >
              <Link to="/patient/change-password">
                <i className="fas fa-lock"></i>
                <span>Change Password</span>
              </Link>
            </li>
            <li onClick={handleLogout}>
              <Link to="#0">
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default DashboardSidebar;
