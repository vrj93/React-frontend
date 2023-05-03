import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UAParser } from "ua-parser-js";
import PersonalDetails from "./PersonalDetails";
import ContactDetails from "./ContactDetails";

const UserDetails = () => {
  const navigate = useNavigate();
  const [slide1, setSlide1] = useState("");
  const [slide2, setSlide2] = useState("d-none");
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    day: "",
    month: "",
    year: "",
  });
  const [userError, setUserError] = useState({
    firstName: "d-none",
    lastName: "d-none",
    day: "d-none",
    month: "d-none",
    year: "d-none",
  });
  const [contactDetails, setContactDetails] = useState({
    email: "",
    phone: "",
  });
  const [contactError, setContactError] = useState({
    email: "",
    phone: "",
  });

  const handleSlide = () => {
    const errorObj = {};

    !userDetails.firstName
      ? (errorObj.firstName = "")
      : (errorObj.firstName = "d-none");
    !userDetails.lastName
      ? (errorObj.lastName = "")
      : (errorObj.lastName = "d-none");
    !userDetails.day ? (errorObj.day = "") : (errorObj.day = "d-none");
    !userDetails.month ? (errorObj.month = "") : (errorObj.month = "d-none");
    !userDetails.year ? (errorObj.year = "") : (errorObj.year = "d-none");

    setUserError(errorObj);

    const emptyValues = Object.entries(userDetails).filter(
      ([key, value]) => value === ""
    );

    if (emptyValues.length == 0) {
      // Object does not have any empty values
      setSlide1("d-none");
      setSlide2("");
    }

    console.log(userDetails);
    console.log(userError);
  };

  const hadndleSubmit = async (e) => {
    e.preventDefault();

    const errorObj = {
      email: "",
      phone: "",
    };

    !contactDetails.email
      ? (errorObj.email = "Email is required")
      : (errorObj.email = "");
    !contactDetails.phone
      ? (errorObj.phone = "Phone is required")
      : (errorObj.phone = "");

    setContactError(errorObj);

    const emptyValues = Object.entries(contactDetails).filter(
      ([key, value]) => value === ""
    );

    if (emptyValues.length == 0) {
      // Object does not have any empty values

      const userInfo = {
        ...userDetails,
        ...contactDetails,
        ipAddress: Cookies.get("ip"),
        userAgent: userAgent,
        deviceType: deviceType,
        browser: browser,
      };
      console.log(userInfo);

      const res = await fetch("http://localhost:8000/api/v1/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const response = await res.json();

      if (res.ok) {
        console.log(response);
        Cookies.set("userId", response.id);
        navigate(`/address?username=${userDetails.firstName}`);
      } else {
        const contactErrorObj = {
          firstName: "",
          lastName: "",
          day: "",
          month: "",
          year: "",
          email: "",
          phone: "",
        };

        response.errors.firstName
          ? (contactErrorObj.firstName = response.errors.firstName[0])
          : (contactErrorObj.firstName = "");
        response.errors.lastName
          ? (contactErrorObj.lastName = response.errors.lastName[0])
          : (contactErrorObj.lastName = "");
        response.errors.day
          ? (contactErrorObj.day = response.errors.day[0])
          : (contactErrorObj.day = "");
        response.errors.month
          ? (contactErrorObj.month = response.errors.month[0])
          : (contactErrorObj.month = "");
        response.errors.year
          ? (contactErrorObj.year = response.errors.year[0])
          : (contactErrorObj.year = "");
        response.errors.email
          ? (contactErrorObj.email = response.errors.email[0])
          : (contactErrorObj.email = "");
        response.errors.phone
          ? (contactErrorObj.phone = response.errors.phone[0])
          : (contactErrorObj.phone = "");

        setContactError(contactErrorObj);
      }
    }
  };

  const ipAddress = async () => {
    const res = await fetch("https://api.ipify.org?format=json");
    const response = await res.json();
    Cookies.set("ip", response.ip);
  };

  ipAddress();

  const userAgent = navigator.userAgent;

  const deviceType = /iPhone|iPod|iPad|Android|BlackBerry|Windows Phone/.test(
    userAgent
  )
    ? "Mobile"
    : "Desktop";

  const parser = new UAParser();
  const result = parser.setUA(userAgent).getBrowser();
  const browser = `${result.name} ${result.version}`;

  return (
    <>
      <section className="bnrsection">
        <div className="container">
          <div className="row">
            <div className="offset-lg-2 col-lg-8 offset-md-1 col-md-10 col-12 text-center">
              <div className="formpart">
                <form action="" onSubmit={hadndleSubmit}>
                  <PersonalDetails
                    slide1={slide1}
                    setUserDetails={setUserDetails}
                    userDetails={userDetails}
                    userError={userError}
                    handleSlide={handleSlide}
                  />
                  <ContactDetails
                    slide2={slide2}
                    setContactDetails={setContactDetails}
                    contactDetails={contactDetails}
                    contactError={contactError}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserDetails;
