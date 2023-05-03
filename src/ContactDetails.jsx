const ContactDetails = ({
  slide2,
  setContactDetails,
  contactDetails,
  contactError,
}) => {
  return (
    <>
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
          <button type="submit" className="btn btn-success" id="submit_claim">
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default ContactDetails;
