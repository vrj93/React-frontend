import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Address = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");
  const [address1, setAddress1] = useState("d-none");
  const [askAddress, setAskAddress] = useState("");
  const [addressCount, setAddressCount] = useState([1]);
  const [addressDetails, setAddressDetails] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAddress = (event) => {
    if (event === "address") {
      setAskAddress("d-none");
      setAddress1("");
    } else {
      setAskAddress("");
      setAddress1("d-none");
    }
  };

  const handleAddressDetails = (e, line, count) => {
    e.preventDefault();
    const addressObj = {
      ...addressDetails,
      [count]: {
        ...addressDetails[count],
        [line]: e.target.value,
      },
    };

    setAddressDetails(addressObj);
  };

  console.log(addressDetails);

  const handleAddressSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitted(true);

    const res = await fetch("http://localhost:8000/api/v1/address", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: { ...addressDetails },
        userId: Cookies.get("userId"),
      }),
    });

    const response = await res.json();

    if (res.ok) {
      navigate("/thank-you");
    } else {
      alert("Something went wrong");
      console.log(response);
    }
  };

  const addresses = addressCount.map((count, key) => {
    return (
      <div id={`postaddrs${key + 1}`} key={key} className={`address${key + 1}`}>
        <div className="mb-3 text-start">
          <label className="form-label">Previous Address {key + 1}</label>
          <input
            type="text"
            className="form-control mb-3"
            id=""
            name="addressLine1"
            placeholder="Address line 1"
            onChange={(e) => handleAddressDetails(e, 1, key + 1)}
          />
          <input
            type="text"
            className="form-control mb-3"
            id=""
            name="addressLine2"
            placeholder="Address line 2"
            onChange={(e) => handleAddressDetails(e, 2, key + 1)}
          />
          <input
            type="text"
            className="form-control mb-3"
            id=""
            name="addressLine3"
            placeholder="Address line 3"
            onChange={(e) => handleAddressDetails(e, 3, key + 1)}
          />
        </div>
      </div>
    );
  });

  return (
    <>
      <section className="bnrsection">
        <div className="container">
          <div className="row">
            <div className="offset-lg-1 col-lg-10 col-md-12 col-12 text-center">
              <h1>Hi {username}</h1>
            </div>
            <div className="offset-lg-2 col-lg-8 offset-md-1 col-md-10 col-12 text-center">
              <div className="formpart">
                <form action="" onSubmit={handleAddressSubmit}>
                  <div id="slide03" className={askAddress}>
                    <h3>Do you have a Previous Address?</h3>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        onClick={() => handleAddress("address")}
                      />
                      <label
                        className="form-check-label next02"
                        htmlFor="flexRadioDefault1"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        onClick={() => navigate("/thank-you")}
                      />
                      <label
                        className="form-check-label tothank"
                        htmlFor="flexRadioDefault2"
                      >
                        No
                      </label>
                    </div>
                  </div>

                  <div id="slide04" className={address1}>
                    <h3>Enter your Previous Address</h3>

                    {addresses}

                    <div className="mb-3 text-center">
                      <button
                        type="submit"
                        className="btn btn-success tothank"
                        disabled={isSubmitted}
                      >
                        Submit
                      </button>
                      {addressCount.length < 3 && (
                        <p>
                          <a
                            href="#postaddrs2"
                            id="showadrs2"
                            onClick={() =>
                              setAddressCount([...addressCount, 1])
                            }
                          >
                            Add Another Address
                          </a>
                        </p>
                      )}
                      {addressCount.length == 1 && (
                        <p>
                          <a
                            href="#"
                            id="back"
                            onClick={() => handleAddress("back")}
                          >{`<< Back`}</a>
                        </p>
                      )}
                      {addressCount.length > 1 && (
                        <p>
                          <a
                            href="#slide04"
                            id="remove4"
                            onClick={() => {
                              setAddressCount(addressCount.slice(0, -1));
                            }}
                          >
                            Remove Address
                          </a>
                        </p>
                      )}
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

export default Address;
