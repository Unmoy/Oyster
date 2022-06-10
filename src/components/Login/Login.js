import React, { useState } from "react";
import "./Login.css";
import googleicon from "../../assets/images/login/g-icon.png";
import loginimage from "../../assets/images/login/loginbottom.png";
const Login = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [status, setStatus] = useState("login");
  const [number, setNumber] = useState("");
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("Enter");
    }
  };
  const handleVerifyKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("Enter");
    }
  };
  return (
    <section className="login_screen">
      <div className="container">
        <div className="row d-flex align-items-center">
          {status === "login" && (
            <>
              <div className="col-md-6 mb-4">
                <div className="login_form">
                  <h1>Oyster Welcome’s you</h1>
                  <p className="login_sub_heading">
                    Sign in to begin your writing journey with oyster.
                  </p>
                  <div>
                    <input
                      type="text"
                      name="number"
                      id="number"
                      className="number_input"
                      placeholder="Enter Phone Number"
                      onChange={(e) => setNumber(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                    <div id="recaptcha-container" />
                    <div className="login_btn">
                      <button
                        onClick={() => {
                          setStatus("otp");
                          console.log("otp");
                        }}
                      >
                        Login
                      </button>
                    </div>
                    <div className="divider">
                      <h1>or</h1>
                    </div>
                    <button className="google_btn">
                      <img src={googleicon} alt="googleicon" />
                      Sign up with google
                    </button>
                  </div>
                </div>
              </div>
              <div className="login_banner col-md-6">
                <img src={loginimage} alt="" />
              </div>
            </>
          )}
          {status === "otp" && (
            <>
              <div className="col-md-6 mb-4">
                <div className="login_form">
                  <h1>Oyster Welcome’s you</h1>
                  <p className="otp_login_sub_heading">
                    Please enter OTP we sended on your enterd mobile number
                  </p>
                  <div>
                    <div className="w-75 d-flex justify-content-between mb-0">
                      <p className="num">+91-{number}</p>
                      <p className="change_num">edit number</p>
                    </div>
                    <div className="w-75 otp_box d-flex justify-content-center ms-3">
                      {otp.map((data, index) => {
                        return (
                          <input
                            autoFocus={index == 0 ? true : false}
                            className="verify_otp"
                            type="text"
                            name="otp"
                            maxLength="1"
                            key={index}
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onFocus={(e) => e.target.select()}
                            onKeyDown={handleVerifyKeyPress}
                          />
                        );
                      })}
                    </div>
                    <div className="login_btn">
                      <button onClick={() => setStatus("loggedIn")}>
                        Verify OTP
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="login_banner col-md-6">
                <img src={loginimage} alt="" />
              </div>
            </>
          )}
          {status === "loggedIn" && (
            <>
              {" "}
              <div className="col-md-6 mb-4">
                <div className="login_form">
                  <h1>Oyster Welcome’s you</h1>
                  <p className="login_sub_heading">It won’t take long</p>
                  <div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="number_input"
                      placeholder="Name"
                    />
                    <input
                      type="date"
                      name="date"
                      id="dob"
                      className="number_input"
                      placeholder="Date of birth"
                    />
                    <input
                      type="text"
                      name="number"
                      id="number"
                      className="number_input"
                      placeholder="Phone Number"
                    />
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="number_input"
                      placeholder="Email"
                    />
                    <div className="login_btn">
                      <button>Continue</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 login_banner">
                <img src={loginimage} alt="" className="" />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
