import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UAParser } from "ua-parser-js";

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
                  <div id="slide01" className={slide1}>
                    <h3>Enter Your Personal Details</h3>
                    <div className="mb-3 text-start">
                      <label htmlFor="firstName" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="First Name"
                        onBlur={(e) =>
                          setUserDetails({
                            ...userDetails,
                            firstName: e.target.value,
                          })
                        }
                      />
                      <span
                        id="firstname_err"
                        className={"error_msg error " + userError.firstName}
                      >
                        First name is required
                      </span>
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Last Name"
                        onBlur={(e) =>
                          setUserDetails({
                            ...userDetails,
                            lastName: e.target.value,
                          })
                        }
                      />
                      <span
                        id="lastname_err"
                        className={"error_msg error " + userError.lastName}
                      >
                        Last name is required
                      </span>
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="day" className="form-label">
                        Enter Your Date of Birth
                      </label>
                      <fieldset>
                        <legend> Date Of Birth</legend>
                        <div className="row">
                          <div className="form-group col-lg-4 col-md-4 col-sm-4 col-12 ">
                            <select
                              name="day"
                              id="day"
                              className="form-control watermark"
                              onBlur={(e) =>
                                setUserDetails({
                                  ...userDetails,
                                  day: e.target.value,
                                })
                              }
                            >
                              <option value="">Day </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                              <option value="13">13</option>
                              <option value="14">14</option>
                              <option value="15">15</option>
                              <option value="16">16</option>
                              <option value="17">17</option>
                              <option value="18">18</option>
                              <option value="19">19</option>
                              <option value="20">20</option>
                              <option value="21">21</option>
                              <option value="22">22</option>
                              <option value="23">23</option>
                              <option value="24">24</option>
                              <option value="25">25</option>
                              <option value="26">26</option>
                              <option value="27">27</option>
                              <option value="28">28</option>
                              <option value="29">29</option>
                              <option value="30">30</option>
                              <option value="31">31</option>
                            </select>
                            <i
                              className="validate d-none"
                              aria-hidden="true"
                            ></i>
                            <span
                              id="day_err"
                              className={"error_msg error " + userError.day}
                            >
                              Day is required
                            </span>
                          </div>
                          <div className="form-group col-lg-4 col-md-4 col-sm-4 col-12 ">
                            <select
                              name="month"
                              id="month"
                              className="form-control watermark"
                              onBlur={(e) =>
                                setUserDetails({
                                  ...userDetails,
                                  month: e.target.value,
                                })
                              }
                            >
                              <option value="">Month </option>
                              <option value="1">January</option>
                              <option value="2">February</option>
                              <option value="3">March</option>
                              <option value="4">April</option>
                              <option value="5">May</option>
                              <option value="6">June</option>
                              <option value="7">July</option>
                              <option value="8">August</option>
                              <option value="9">September</option>
                              <option value="10">October</option>
                              <option value="11">November</option>
                              <option value="12">December</option>
                            </select>
                            <i
                              className="validate d-none"
                              aria-hidden="true"
                            ></i>
                            <span
                              id="month_err"
                              className={"error_msg error " + userError.month}
                            >
                              Month is required
                            </span>
                          </div>
                          <div className="form-group col-lg-4 col-md-4 col-sm-4 col-12">
                            <select
                              name="year"
                              id="year"
                              className="form-control"
                              onBlur={(e) =>
                                setUserDetails({
                                  ...userDetails,
                                  year: e.target.value,
                                })
                              }
                            >
                              <option value="">Year</option>
                              <option value="2002">2002</option>
                              <option value="2001">2001</option>
                              <option value="2000">2000</option>
                              <option value="1999">1999</option>
                              <option value="1998">1998</option>
                              <option value="1997">1997</option>
                              <option value="1996">1996</option>
                              <option value="1995">1995</option>
                              <option value="1994">1994</option>
                              <option value="1993">1993</option>
                              <option value="1992">1992</option>
                              <option value="1991">1991</option>
                              <option value="1990">1990</option>
                              <option value="1989">1989</option>
                              <option value="1988">1988</option>
                              <option value="1987">1987</option>
                              <option value="1986">1986</option>
                              <option value="1985">1985</option>
                              <option value="1984">1984</option>
                              <option value="1983">1983</option>
                              <option value="1982">1982</option>
                              <option value="1981">1981</option>
                              <option value="1980">1980</option>
                              <option value="1979">1979</option>
                              <option value="1978">1978</option>
                              <option value="1977">1977</option>
                              <option value="1976">1976</option>
                              <option value="1975">1975</option>
                              <option value="1974">1974</option>
                              <option value="1973">1973</option>
                              <option value="1972">1972</option>
                              <option value="1971">1971</option>
                              <option value="1970">1970</option>
                              <option value="1969">1969</option>
                              <option value="1968">1968</option>
                              <option value="1967">1967</option>
                              <option value="1966">1966</option>
                              <option value="1965">1965</option>
                              <option value="1964">1964</option>
                              <option value="1963">1963</option>
                              <option value="1962">1962</option>
                              <option value="1961">1961</option>
                              <option value="1960">1960</option>
                              <option value="1959">1959</option>
                              <option value="1958">1958</option>
                              <option value="1957">1957</option>
                              <option value="1956">1956</option>
                              <option value="1955">1955</option>
                              <option value="1954">1954</option>
                              <option value="1953">1953</option>
                              <option value="1952">1952</option>
                              <option value="1951">1951</option>
                              <option value="1950">1950</option>
                              <option value="1949">1949</option>
                              <option value="1948">1948</option>
                              <option value="1947">1947</option>
                              <option value="1946">1946</option>
                              <option value="1945">1945</option>
                              <option value="1944">1944</option>
                              <option value="1943">1943</option>
                              <option value="1942">1942</option>
                              <option value="1941">1941</option>
                              <option value="1940">1940</option>
                              <option value="1939">1939</option>
                              <option value="1938">1938</option>
                              <option value="1937">1937</option>
                              <option value="1936">1936</option>
                              <option value="1935">1935</option>
                              <option value="1934">1934</option>
                              <option value="1933">1933</option>
                              <option value="1932">1932</option>
                              <option value="1931">1931</option>
                              <option value="1930">1930</option>
                              <option value="1929">1929</option>
                              <option value="1928">1928</option>
                              <option value="1927">1927</option>
                              <option value="1926">1926</option>
                              <option value="1925">1925</option>
                              <option value="1924">1924</option>
                              <option value="1923">1923</option>
                              <option value="1922">1922</option>
                              <option value="1921">1921</option>
                              <option value="1920">1920</option>
                              <option value="1919">1919</option>
                              <option value="1918">1918</option>
                              <option value="1917">1917</option>
                              <option value="1916">1916</option>
                              <option value="1915">1915</option>
                              <option value="1914">1914</option>
                              <option value="1913">1913</option>
                              <option value="1912">1912</option>
                              <option value="1911">1911</option>
                              <option value="1910">1910</option>
                            </select>
                            <i
                              className="validate d-none"
                              aria-hidden="true"
                            ></i>
                            <span
                              id="year_err"
                              className={"error_msg error " + userError.year}
                            >
                              Year is required
                            </span>
                          </div>
                          <span id="final_err" className="error_msg"></span>
                        </div>
                      </fieldset>
                    </div>
                    <div className="mb-3 text-center">
                      <button
                        type="button"
                        className="btn btn-warning next01"
                        onClick={handleSlide}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div id="slide02" className={slide2}>
                    <h3>Enter Your Contact Details</h3>
                    <div className="mb-3 text-start">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email Address"
                        onBlur={(e) =>
                          setContactDetails({
                            ...contactDetails,
                            email: e.target.value,
                          })
                        }
                      />
                      <span id="year_err" className={"error_msg error "}>
                        {contactError.email}
                      </span>
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="phone"
                        placeholder="Phone Number"
                        max={9999999999}
                        min={1000000000}
                        onBlur={(e) =>
                          setContactDetails({
                            ...contactDetails,
                            phone: e.target.value,
                          })
                        }
                      />
                      <span id="year_err" className={"error_msg error "}>
                        {contactError.phone}
                      </span>
                    </div>
                    <div className="mb-3 text-center">
                      <button
                        type="submit"
                        className="btn btn-success"
                        id="submit_claim"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
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
