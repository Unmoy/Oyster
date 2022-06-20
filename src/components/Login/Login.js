import React, { useEffect, useState } from "react";
import "./Login.css";
import googleicon from "../../assets/images/login/g-icon.png";
import loginimage from "../../assets/images/login/loginbottom.png";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/Oyster logo.png";

const Login = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [status, setStatus] = useState("login");
  const [number, setNumber] = useState("");
  const [result, setResult] = useState();
  const [error, setError] = useState("");
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const handleVerifyKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("Enter");
    }
  };

  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const { signInWithGoogle } = useAuth();
  const { signInWithPhone } = useAuth();
  const { signInWithOtp } = useAuth();
  const { logout } = useAuth();
  const token = localStorage.getItem("token");
  const check = () => {
    fetch("https://oysterbackend.herokuapp.com/user/login", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result === true) {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log("error", error);
        navigate("/login");
      });
  };
  useEffect(() => {
    check();
    if (currentUser && currentUser.uid) {
      // navigate("/dashboard");
    }
  }, [currentUser, token]);

  const googleLogin = async () => {
    try {
      setError("");
      await signInWithGoogle();
      setStatus("loggedIn");
    } catch {
      setError("Failed to create an account");
    }
  };
  const getOtp = async () => {
    console.log(number);
    if (number === "" || number === undefined) return setStatus("login");
    try {
      let newNumber = "+91" + number;
      const response = await signInWithPhone(newNumber);
      console.log("OTP SENT");
      setStatus("otp");
      setResult(response);
    } catch (err) {
      console.log(err);
    }
  };
  const verifyOtp = async () => {
    let otp1 = "";
    otp.map((o) => (otp1 += o));
    if (otp1 === "" || otp1 === null) return;
    signInWithOtp(result, otp1);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getOtp();
      console.log("enter");
    }
  };
  return (
    <section className="login_screen">
      <div className="container">
        <div className="login_logo_wrapper">
          <div className="logo_icon">
            <img src={logo} alt="logo" />
          </div>
        </div>
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
                      value={
                        number !== "" && number !== undefined ? number : null
                      }
                      onKeyDown={handleKeyPress}
                    />
                    <div id="recaptcha-container" />
                    <div className="login_btn">
                      <button
                        disabled={
                          !number || number === "" || number.length != 10
                        }
                        onClick={() => {
                          getOtp();
                        }}
                      >
                        Login
                      </button>
                    </div>
                    <div className="divider">
                      <h1>or</h1>
                    </div>
                    <button
                      className="google_btn"
                      onClick={() => {
                        googleLogin();
                      }}
                    >
                      <img src={googleicon} alt="googleicon" />
                      Sign up with google
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="login_border">
                  <div className="banner_top">
                    <p>
                      To Err is Human. <br /> To Use Oyster,
                      <span className="divine"> Divine.</span>
                    </p>
                  </div>
                  <div className="login_banner">
                    <img src={loginimage} alt="" className="login_banner_img" />
                  </div>
                </div>
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
                      <p
                        className="change_num"
                        onClick={async () => {
                          await setStatus("login");
                          setOtp(new Array(6).fill(""));
                          document.getElementById("number").focus();
                        }}
                      >
                        Edit number
                      </p>
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
                      <button
                        onClick={() => {
                          verifyOtp();
                        }}
                      >
                        Verify OTP
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="login_border">
                  <div className="banner_top">
                    <p>
                      To Err is Human. <br /> To Use Oyster,
                      <span className="divine"> Divine.</span>
                    </p>
                  </div>
                  <div className="login_banner">
                    <img src={loginimage} alt="" className="login_banner_img" />
                  </div>
                </div>
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
              <div className="col-md-6">
                <div className="login_border">
                  <div className="banner_top">
                    <p>
                      To Err is Human. <br /> To Use Oyster,
                      <span className="divine"> Divine.</span>
                    </p>
                  </div>
                  <div className="login_banner">
                    <img src={loginimage} alt="" className="login_banner_img" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
