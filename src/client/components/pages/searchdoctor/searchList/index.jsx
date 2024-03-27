import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Lightbox from 'react-image-lightbox';
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import {
  IMG01,
  IMG02,
  IMG03,
  IMG04,
  IMG05,
  IMG_sp_02,
  IMG_sp_03,
  IMG_sp_04,
  IMG_sp_05,
} from "./img";
 
import MyComponent from "./mycomponent";
import { userRequestLdExplained } from "../../../../../../requestMethod";
import { useValue } from "../../../../../context/ContextProvider";

const SearchList = () => {

  const {
    state: {doctorFilteredList},
    dispatch,
  } = useValue();


  // console.log(doctorId, "docdnns");
  console.log(doctorFilteredList, "docdnns");
//docters list
const [doctorList, setDoctorList] = useState(doctorFilteredList);

// const getDoctersData = async () =>{
//   try{
//     let response = await userRequestLdExplained.get(`/doctors/getDoctorsDetails`);
//     // console.log(response.data, "<==data List");
//     setDoctorList(response.data)
//   }catch(err){
//     console.log(err)
//   }
// }

useEffect(()=>{
  // getDoctersData();
},[doctorList])

// Function to map specialization array to a visual representation, if necessary
// const renderSpecialization = (specializations) => {
//   return specializations.map((spec, index) => (
//     <span key={index}>{spec.name}</span> // Assuming each specialization has a 'name' property
//   ));
// };

// const handleViewProfileClick = (doctorId) => {
//   console.log(doctorId, "fjdksjfsk gh");
//   // Dispatch an action with the doctor's ID as the payload
//   dispatch({ type: "DOCTER_ID", payload: doctorId });

//   // If you need to navigate as well, include navigation logic here
//   // navigate(`/patient/doctor-profile/${doctorId}`);
// };

  return (
    <div>
      {doctorFilteredList.map((doctor, index) => (
        <div key={index} className="card">
        <div className="card-body">
          <div className="doctor-widget">
            <div className="doc-info-left">
              <div className="doctor-img">
                <Link to="/patient/doctor-profile">
                  <img src={IMG01} className="img-fluid" alt="User" />
                </Link>
              </div>
              <div className="doc-info-cont">
                <h4 className="doc-name">
                  <Link to="/patient/doctor-profile">{doctor.name}</Link>
                </h4>
                <p className="doc-speciality">
                   {doctor.degrees[0].degree}
                </p>
                <h5 className="doc-department">
                  <img src={IMG_sp_02} className="img-fluid" alt="Speciality" />
                  Dentist
                </h5>
                <div className="rating">
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star"></i>
                  <span className="d-inline-block average-rating ms-1">
                    (17)
                  </span>
                </div>
                <div className="clinic-details">
                  <p className="doc-location">
                    <i className="fas fa-map-marker-alt"></i> {doctor.location}
                  </p>
                  <div>
                    <MyComponent />
                  </div>
                </div>
                <div className="clinic-services">
                  <span>Dental Fillings</span>
                  <span> Whitneing</span>
                </div>
              </div>
            </div>
            <div className="doc-info-right">
              <div className="clini-infos">
                <ul>
                  <li>
                    <i className="far fa-thumbs-up"></i> 98%
                  </li>
                  <li>
                    <i className="far fa-comment"></i> 17 Feedback d
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt"></i> {doctor.location}
                  </li>
                  <li>
                    {/* <i className="far fa-money-bill-alt"></i> {doctor.booking_fee} $300 - $1000{" "} */}
                    <i className="far fa-money-bill-alt"></i> {doctor.booking_fee}
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">Lorem Ipsum</Tooltip>
                      }
                    >
                      <span className="d-inline-block">
                        <i className="fas fa-info-circle"></i>
                      </span>
                    </OverlayTrigger>
                  </li>
                </ul>
              </div>
              <div className="clinic-booking">
              <Link to={`/patient/doctor-profile/${doctor.id}`} className="view-pro-btn">
                View Profile
              </Link>
                <Link to="/patient/booking1" className="apt-btn">
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div> 
       ))}
      

      {/* {doctorList.map((doctor, index) => (
        <div key={index} className="card">
          <div className="card-body">
            <div className="doctor-widget">
              <div className="doc-info-left">
                <div className="doctor-img">
                  <Link to="/patient/doctor-profile">
                    <img src={IMG01} className="img-fluid" alt="User" />
                  </Link>
                </div>
                <div className="doc-info-cont">
                  <h4 className="doc-name">
                    <Link to="/patient/doctor-profile">{doctor.name}</Link>
                  </h4>
                  <p className="doc-speciality">
                    {doctor.degrees.map((degree, i) => (
                      <span key={i}>{degree.name}{i < doctor.degrees.length - 1 ? ', ' : ''}</span>
                    ))}
                  </p>
                  <h5 className="doc-department">
                    {renderSpecialization(doctor.specialization)}
                  </h5>
                  <div className="clinic-details">
                    <p className="doc-location">
                      <i className="fas fa-map-marker-alt"></i> {doctor.location}
                    </p>
                    <div>
                      <MyComponent />
                    </div>
                  </div>
                  <div className="clinic-services">
                    {doctor.services.map((service, index) => (
                      <span key={index}>{service.name}</span> // Adjust according to your data
                    ))}
                  </div>
                </div>
              </div>
              <div className="doc-info-right">
                <div className="clinic-booking">
                  <Link to="/patient/doctor-profile" className="view-pro-btn">
                    View Profile
                  </Link>
                  <Link to="/patient/booking1" className="apt-btn">
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))} 
    */}

      <div className="card">
        <div className="card-body">
          <div className="doctor-widget">
            <div className="doc-info-left">
              <div className="doctor-img">
                <Link to="/patient/doctor-profile">
                  <img src={IMG02} className="img-fluid" alt="User" />
                </Link>
              </div>
              <div className="doc-info-cont">
                <h4 className="doc-name">
                  <Link to="/patient/doctor-profile">Dr. Darren Elder</Link>
                </h4>
                <p className="doc-speciality">
                  BDS, MDS - Oral & Maxillofacial Surgery
                </p>
                <h5 className="doc-department">
                  <img src={IMG_sp_03} className="img-fluid" alt="Speciality" />
                  Dentist
                </h5>
                <div className="rating">
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star"></i>
                  <span className="d-inline-block average-rating ms-1">
                    (35)
                  </span>
                </div>
                <div className="clinic-details">
                  <p className="doc-location">
                    <i className="fas fa-map-marker-alt"></i> Newyork, USA
                  </p>
                  <div>
                    <MyComponent />
                  </div>
                </div>
                <div className="clinic-services">
                  <span>Dental Fillings</span>
                  <span> Whitneing</span>
                </div>
              </div>
            </div>
            <div className="doc-info-right">
              <div className="clini-infos">
                <ul>
                  <li>
                    <i className="far fa-thumbs-up"></i> 100%
                  </li>
                  <li>
                    <i className="far fa-comment"></i> 35 Feedback
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt"></i> Newyork, USA
                  </li>
                  <li>
                    <i className="far fa-money-bill-alt"></i> $50 - $300{" "}
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">Lorem Ipsum</Tooltip>
                      }
                    >
                      <span className="d-inline-block">
                        <i className="fas fa-info-circle"></i>
                      </span>
                    </OverlayTrigger>
                  </li>
                </ul>
              </div>
              <div className="clinic-booking">
                <Link to="/patient/doctor-profile" onClick={() => handleViewProfileClick(doctor.id)} className="view-pro-btn">
                  View Profile
                </Link>
                <Link to="/patient/booking1" className="apt-btn">
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="card">
        <div className="card-body">
          <div className="doctor-widget">
            <div className="doc-info-left">
              <div className="doctor-img">
                <Link to="/patient/doctor-profile">
                  <img src={IMG03} className="img-fluid" alt="User" />
                </Link>
              </div>
              <div className="doc-info-cont">
                <h4 className="doc-name">
                  <Link to="/patient/doctor-profile">Dr. Deborah Angel</Link>
                </h4>
                <p className="doc-speciality">
                  MBBS, MD - General Medicine, DNB - Cardiology
                </p>
                <p className="doc-department">
                  <img src={IMG_sp_04} className="img-fluid" alt="Speciality" />
                  Cardiology
                </p>
                <div className="rating">
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star"></i>
                  <span className="d-inline-block average-rating ms-1">
                    (27)
                  </span>
                </div>
                <div className="clinic-details">
                  <p className="doc-location">
                    <i className="fas fa-map-marker-alt"></i> Newyork, USA
                  </p>
                  <div>
                    <MyComponent />
                  </div>
                </div>
                <div className="clinic-services">
                  <span>Dental Fillings</span>
                  <span> Whitneing</span>
                </div>
              </div>
            </div>
            <div className="doc-info-right">
              <div className="clini-infos">
                <ul>
                  <li>
                    <i className="far fa-thumbs-up"></i> 99%
                  </li>
                  <li>
                    <i className="far fa-comment"></i> 35 Feedback
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt"></i> Newyork, USA
                  </li>
                  <li>
                    <i className="far fa-money-bill-alt"></i> $100 - $400{" "}
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">Lorem Ipsum</Tooltip>
                      }
                    >
                      <span className="d-inline-block">
                        <i className="fas fa-info-circle"></i>
                      </span>
                    </OverlayTrigger>
                  </li>
                </ul>
              </div>
              <div className="clinic-booking">
                <Link to="/patient/doctor-profile" className="view-pro-btn">
                  View Profile
                </Link>
                <Link to="/patient/booking1" className="apt-btn">
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="doctor-widget">
            <div className="doc-info-left">
              <div className="doctor-img">
                <Link to="/patient/doctor-profile">
                  <img src={IMG04} className="img-fluid" alt="User" />
                </Link>
              </div>
              <div className="doc-info-cont">
                <h4 className="doc-name">
                  <Link to="/patient/doctor-profile">Dr. Sofia Brient</Link>
                </h4>
                <p className="doc-speciality">
                  MBBS, MS - General Surgery, MCh - Urology
                </p>
                <p className="doc-department">
                  <img src={IMG_sp_05} className="img-fluid" alt="Speciality" />
                  Urology
                </p>
                <div className="rating">
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star"></i>
                  <span className="d-inline-block average-rating ms-1">
                    (4)
                  </span>
                </div>
                <div className="clinic-details">
                  <p className="doc-location">
                    <i className="fas fa-map-marker-alt"></i> Newyork, USA
                  </p>
                  <div>
                    <MyComponent />
                  </div>
                </div>
                <div className="clinic-services">
                  <span>Dental Fillings</span>
                  <span> Whitneing</span>
                </div>
              </div>
            </div>
            <div className="doc-info-right">
              <div className="clini-infos">
                <ul>
                  <li>
                    <i className="far fa-thumbs-up"></i> 97%
                  </li>
                  <li>
                    <i className="far fa-comment"></i> 4 Feedback
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt"></i> Newyork, USA
                  </li>
                  <li>
                    <i className="far fa-money-bill-alt"></i> $150 - $250{" "}
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">Lorem Ipsum</Tooltip>
                      }
                    >
                      <span className="d-inline-block">
                        <i className="fas fa-info-circle"></i>
                      </span>
                    </OverlayTrigger>
                  </li>
                </ul>
              </div>
              <div className="clinic-booking">
                <Link to="/patient/doctor-profile" className="view-pro-btn">
                  View Profile
                </Link>
                <Link to="/patient/booking1" className="apt-btn">
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="doctor-widget">
            <div className="doc-info-left">
              <div className="doctor-img">
                <Link to="/patient/doctor-profile">
                  <img src={IMG05} className="img-fluid" alt="User" />
                </Link>
              </div>
              <div className="doc-info-cont">
                <h4 className="doc-name">
                  <Link to="/patient/doctor-profile">
                    Dr. Katharine Berthold
                  </Link>
                </h4>
                <p className="doc-speciality">
                  MS - Orthopaedics, MBBS, M.Ch - Orthopaedics
                </p>
                <p className="doc-department">
                  <img src={IMG_sp_03} className="img-fluid" alt="Speciality" />
                  Orthopaedics
                </p>
                <div className="rating">
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star"></i>
                  <span className="d-inline-block average-rating ms-1">
                    (52)
                  </span>
                </div>
                <div className="clinic-details">
                  <p className="doc-location">
                    <i className="fas fa-map-marker-alt"></i> Newyork, USA
                  </p>
                  <div>
                    <MyComponent />
                  </div>
                </div>
                <div className="clinic-services">
                  <span>Dental Fillings</span>
                  <span> Whitneing</span>
                </div>
              </div>
            </div>
            <div className="doc-info-right">
              <div className="clini-infos">
                <ul>
                  <li>
                    <i className="far fa-thumbs-up"></i> 100%
                  </li>
                  <li>
                    <i className="far fa-comment"></i> 52 Feedback
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt"></i> Texas, USA
                  </li>
                  <li>
                    <i className="far fa-money-bill-alt"></i> $100 - $500{" "}
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">Lorem Ipsum</Tooltip>
                      }
                    >
                      <span className="d-inline-block">
                        <i className="fas fa-info-circle"></i>
                      </span>
                    </OverlayTrigger>
                  </li>
                </ul>
              </div>
              <div className="clinic-booking">
                <Link to="/patient/doctor-profile" className="view-pro-btn">
                  View Profile
                </Link>
                <Link to="/patient/booking1" className="apt-btn">
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SearchList;
