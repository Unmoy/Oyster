import React from "react";
import "./Header.css";
import headerImage from "../../../assets/images/header.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleChange = () => {
    navigate("/texteditor");
  };
  return (
    <div>
      <section className="container-fluid home">
        <div className="row d-flex align-items-center">
          <div className="col-md-12 col-lg-6">
            <div className="content">
              <h2>
                <span className="header_span_1">Oyster</span> is one stop
                destination for all the things{" "}
                <span className="header_span_2">content.</span>
              </h2>
              <button className="get_started_btn" onClick={handleChange}>
                Get Started
                <svg
                  className="ms-2 startSvg"
                  width="20"
                  height="19"
                  viewBox="0 0 25 19"
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M-4.15258e-07 9.49992C-4.27493e-07 9.22001 0.0940621 8.95156 0.261495 8.75364C0.428927 8.55571 0.656014 8.44452 0.8928 8.44452L21.9504 8.44452L16.3311 1.80389C16.1635 1.60572 16.0693 1.33693 16.0693 1.05666C16.0693 0.776399 16.1635 0.507613 16.3311 0.309436C16.4987 0.111259 16.7261 -7.51177e-05 16.9632 -7.51281e-05C17.2003 -7.51384e-05 17.4277 0.111259 17.5953 0.309436L24.7377 8.75269C24.8208 8.85073 24.8868 8.9672 24.9318 9.09542C24.9768 9.22364 25 9.3611 25 9.49992C25 9.63875 24.9768 9.7762 24.9318 9.90443C24.8868 10.0326 24.8208 10.1491 24.7377 10.2472L17.5953 18.6904C17.4277 18.8886 17.2003 18.9999 16.9632 18.9999C16.7261 18.9999 16.4987 18.8886 16.3311 18.6904C16.1635 18.4922 16.0693 18.2234 16.0693 17.9432C16.0693 17.6629 16.1635 17.3941 16.3311 17.196L21.9504 10.5553L0.8928 10.5553C0.656014 10.5553 0.428927 10.4441 0.261495 10.2462C0.0940622 10.0483 -4.03023e-07 9.77984 -4.15258e-07 9.49992Z"
                    fill="white"
                  />
                </svg>
              </button>
              <p>
                Sign up <span className="header_span_3">FREE</span> for Oyster,
                a powerful, end-to-end AI-based platform that checks your
                writing for grammar errors, plagiarism.
              </p>
            </div>
          </div>
          <div className="image col-md-12 col-lg-6">
            <img src={headerImage} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;
