import React, { useEffect } from "react";
import loginimage from "../../assets/images/login/loginbottom.png";
import "./AddDetials.css";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const AddDetials = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [disable, setDisabled] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate()
  useEffect(() => {
    if (currentUser && currentUser.uid) {
      if (currentUser.name) {
        setName(currentUser.name);
      }
      if (currentUser.email) {
        setEmail(currentUser.email);
        setDisabled("email");
      }
      if (currentUser.phone) {
        setPhone(currentUser.phone);
        setDisabled("phone");
      }
    }
  }, [currentUser]);

  const submitDetails = () => {
    // const id = currentUser.id;
    const id = localStorage.getItem("id");
    console.log(name, date, phone, email, id);
    fetch("https://oysterbackend.herokuapp.com/add/details", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name, date, phone, email, id  
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === "SUCCESS") {
          navigate("/dashboard")
        } else {
          console.log(data.message);
        }
      });
  };
  return (
    <div className="details">
      <div className="container">
        <div className="row d-flex align-items-center">
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
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <input
                  type="date"
                  name="date"
                  id="dob"
                  className="number_input"
                  placeholder="Date of birth"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
                <input
                  type="text"
                  name="number"
                  id="number"
                  className="number_input"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  disabled={disable === "phone"}
                />
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="number_input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  disabled={disable === "email"}
                />
                <div className="login_btn">
                  <button
                    disabled={!phone || !name || !date || !email || (phone && phone.length!=10)}
                    onClick={() => {
                      submitDetails();
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 login_banner">
            <img src={loginimage} alt="" className="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDetials;
