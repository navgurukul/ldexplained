import React, { useEffect, useState } from "react";
// import Select from "react-select";
// import SearchFilter from "./searchFilter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import StickyBox from "react-sticky-box";
import { userRequestLdExplained } from "../../../../../requestMethod";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { API_TOKEN } from "../../../../constant";
console.log(API_TOKEN, "API_TOKEN");
import { useValue } from "../../../../context/ContextProvider";
import Footer from "../../footer";
import Header from "../../header";
import SearchList from "./searchList";

const SearchDoctor = (props) => {
  const {
    state: {},
    dispatch,
  } = useValue();

  // console.log(doctorFilteredList, "doctorFilteredList");
  // let pathname = props.location.pathname;

  // if (props.location.pathname === "/patient/search-doctor1") {
  //   require("../../../assets/css/feather.css");
  // }
  // const options = [
  //   { value: "Select", label: "Select" },
  //   { value: "Rating", label: "Rating" },
  //   { value: "Popular", label: "Popular" },
  //   { value: "Lastest", label: "Lastest" },
  //   { value: "Free", label: "Free" },
  // ];

  // http://ld_explained.navgurukul.org/doctors/getDoctorsDetailsByFilter?gender=male&specialization=e

  const [doctorList, setDoctorList] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedSpecialists, setSelectedSpecialists] = useState([]);
  const [renderOnClearBtn, setRenderOnClearBtn] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleGenderChange = (e) => {
    const { value, checked } = e.target;
    const newGenders = checked
      ? [...selectedGenders, value]
      : selectedGenders.filter((gender) => gender !== value);
    setSelectedGenders(newGenders);
  };

  const handleSpecialistChange = (e) => {
    const { value, checked } = e.target;
    const newSpecialists = checked
      ? [...selectedSpecialists, value]
      : selectedSpecialists.filter((specialist) => specialist !== value);
    setSelectedSpecialists(newSpecialists);
  };

  // const concatenateValues = (array) => array.join("").toLowerCase();

  // const handleSearch = () => {
  //   console.log("Selected Genders:", selectedGenders);
  //   console.log("Selected Specialists:", selectedSpecialists);
  //   // Perform API call or any other action here
  //   searchDoctorFilter();
  // };

  // const handleSearch = async () => {
  //   console.log("gg");
  //   const concatenatedGenders = concatenateValues(selectedGenders);
  //   const concatenatedSpecialists = concatenateValues(selectedSpecialists);

  //   let queryString = "";
  //   if (concatenatedGenders || concatenatedSpecialists) {
  //     queryString += "?";
  //     if (concatenatedGenders) queryString += `gender=${concatenatedGenders}`;
  //     if (concatenatedGenders && concatenatedSpecialists) queryString += "&";
  //     if (concatenatedSpecialists)
  //       queryString += `specialization=${concatenatedSpecialists}`;
  //   }
  //   console.log(queryString, "queryStringqueryString");
  //   try {
  //     let response = await userRequestLdExplained.get(
  //       `/doctors/getDoctorsDetailsByFilter${queryString}`
  //     );
  //     console.log(response.data, "<==data List");
  //     setDoctorList(response.data);
  //     dispatch({ type: "DOCTER_FILTERED_LIST", payload: response.data });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleSearch = async () => {
    console.log("gg");       
    try {
      let response = await userRequestLdExplained.get(`/doctors/getDoctorsDetailsByFilter`);
      console.log(response.data, "<==data List");
      setDoctorList(response.data);
      dispatch({ type: "DOCTER_FILTERED_LIST", payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [renderOnClearBtn]);

  const clearArray = () => {
    setSelectedGenders([]);
    setSelectedSpecialists([]);
    setRenderOnClearBtn(!renderOnClearBtn);
    handleSearch();
  };

  return (
    <div>
      <Header {...props} />
      {/* Breadcrumb */}
      <div className="breadcrumb-bar-two">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <h2 className="breadcrumb-title">Search</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/index">Home</Link>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    Search
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}
      <div>
        <div
          className="search-box-one aos"
          data-aos="fade-up"
          style={{
            padding: "10px 20px",
            width: "900px",
            margin:"0px auto",
            marginTop:"50px",
          }}
        >
          <span style={{ margin: "40px 0px" }}>Book Appointment Form </span>
          <form action={`/patient/search-doctor1`}>
            <div className="search-input search-line">
              <i>
                <FeatherIcon icon="search" style={{ width: "16px" }} />
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
                <FeatherIcon icon="map-pin" style={{ width: "16px" }} />
              </i>
              <div className="form-group mb-0" style={{}}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Location"
                />
                <Link className="current-loc-icon current_location" to="#">
                  <i>
                    <FeatherIcon icon="crosshair" style={{ width: "16px" }} />
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
                <FeatherIcon
                  icon={"calendar"}
                  // style={{ width: "16px" }}
                />
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
            <div className="form-search-btn" style={{ width: "150px" }}>
              <button className="btn" type="submit" style={{ width: "100%" }}>
                Search Docter
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-lg-4 col-xl-3 theiaStickySidebar">
              <StickyBox offsetTop={20} offsetBottom={20}>
                {/* Search Filter */}
                <div className="card search-filter">
                  <div className="card-header">
                    <h4 className="card-title mb-0">Search Filter</h4>
                  </div>
                  <div className="card-body">
                    <div className="filter-widget">
                      <div className="cal-icon">
                        {/* <input
                          type="text"
                          className="form-control datetimepicker"
                          placeholder="Select Date"
                        /> */}
                        <DatePicker
                          className="form-control datetimepicker"
                          selected={selectedDate}
                          onChange={handleDateChange}
                          placeholderText="Select Date"
                        />
                      </div>
                    </div>
                    <div className="filter-widget">
                      <h4>Gender</h4>
                      <div>
                        <label className="custom_check">
                          <input
                            type="checkbox"
                            name="gender_type"
                            value="Male"
                            defaultChecked=""
                            onChange={handleGenderChange}
                            checked={selectedGenders.includes("Male")}
                          />
                          <span className="checkmark" /> Male Doctor
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input
                            type="checkbox"
                            value="Female"
                            checked={selectedGenders.includes("Female")}
                            name="gender_type"
                            onChange={handleGenderChange}
                          />
                          <span className="checkmark" /> Female Doctor
                        </label>
                      </div>
                    </div>
                    <div className="filter-widget">
                      <h4>Select Specialist progree_api</h4>
                      <div>
                        <label className="custom_check">
                          <input
                            type="checkbox"
                            name="select_specialist"
                            checked={selectedSpecialists.includes("Urology")}
                            value="Urology"
                            onChange={handleSpecialistChange}
                          />
                          <span className="checkmark" /> Urology
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input
                            type="checkbox"
                            name="select_specialist"
                            checked={selectedSpecialists.includes("Neurology")}
                            value="Neurology"
                            onChange={handleSpecialistChange}
                          />
                          <span className="checkmark" /> Neurology
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input
                            type="checkbox"
                            value="Dentist"
                            name="select_specialist"
                            checked={selectedSpecialists.includes("Dentist")}
                            onChange={handleSpecialistChange}
                          />
                          <span className="checkmark" /> Dentist
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input
                            type="checkbox"
                            value="Orthopedic"
                            checked={selectedSpecialists.includes("Orthopedic")}
                            name="select_specialist"
                            onChange={handleSpecialistChange}
                          />
                          <span className="checkmark" /> Orthopedic
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input
                            type="checkbox"
                            value="Cardiologist"
                            checked={selectedSpecialists.includes(
                              "Cardiologist"
                            )}
                            name="select_specialist"
                            onChange={handleSpecialistChange}
                          />
                          <span className="checkmark" /> Cardiologist
                        </label>
                      </div>
                    </div>
                    <div className="btn-search">
                      <button
                        type="button"
                        className="btn w-100"
                        onClick={handleSearch}
                      >
                        Search
                      </button>
                      <button
                        type="button"
                        className="btn w-100"
                        style={{ marginTop: "20px" }}
                        onClick={clearArray}
                      >
                        Clear Filter
                      </button>
                    </div>
                  </div>
                </div>
                {/* /Search Filter */}
              </StickyBox>
            </div>

            <div className="col-md-12 col-lg-8 col-xl-9">
              <SearchList />
              <div className="load-more text-center">
                <Link to="#" className="btn btn-primary btn-sm">
                  Load More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer {...props} />
    </div>
  );
};

export default SearchDoctor;
