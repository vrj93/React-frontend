const PersonalDetails = ({
  slide1,
  setUserDetails,
  userDetails,
  userError,
  handleSlide,
}) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthsComponent = months.map((month, index) => {
    return (
      <option key={index} value={index + 1}>
        {month}
      </option>
    );
  });

  const daysComponent = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return days;
  };

  const yearsComponent = () => {
    const years = [];
    for (let i = 2002; i >= 1910; i--) {
      years.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return years;
  };

  return (
    <>
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
                  {daysComponent()}
                </select>
                <i className="validate d-none" aria-hidden="true"></i>
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
                  {monthsComponent}
                </select>
                <i className="validate d-none" aria-hidden="true"></i>
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
                  {yearsComponent()}
                </select>
                <i className="validate d-none" aria-hidden="true"></i>
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
    </>
  );
};

export default PersonalDetails;
