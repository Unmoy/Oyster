import React, { useState } from "react";
import "./Pricing.css";
import Navbar from "../Homepage/Navbar/Navbar";
import pricing from "../../assets/images/pricing1.png";
import pricing2 from "../../assets/images/pricing2.png";
import pricing3 from "../../assets/images/pricing3.png";
import pricing4 from "../../assets/images/pricing4.png";
import pricing5 from "../../assets/images/pricing5.png";
const Pricing = () => {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <>
      <Navbar />
      <div className="pricing_container">
        <img className="pricing_images1" src={pricing} alt="" />
        <img className="pricing_images2" src={pricing2} alt="" />
        <img className="pricing_images3" src={pricing3} alt="" />
        <img className="pricing_images4" src={pricing4} alt="" />
        <img className="pricing_images5" src={pricing5} alt="" />
        <div className="d-flex justify-content-center align-items-center">
          <h1 className="pricing_header">
            Export Unlimited Documents <span className="with_span">with</span>{" "}
            <span className="pricing_span">Oyster Premium</span>
          </h1>
        </div>
        <div className="price_content">
          <div className="tab_container">
            <div className="bloc-tabs">
              <button
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}
              >
                Enterprises
              </button>
              <button
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(2)}
              >
                Student
              </button>
            </div>
            <div className="">
              <div
                className={
                  toggleState === 1
                    ? "clinic_content  active_clinic_content"
                    : "clinic_content"
                }
              >
                <div className="enterprise_container">
                  <div className="standard">
                    <h5>Standard</h5>
                    <div className="pricing_cards_wrapper">
                      <div className="pricing_card">
                        <h3>Yearly Plan</h3>
                        <ul>
                          <li>Grammer Suggestion</li>
                          <li>Plagrism Report</li>
                          <li>Content Scheduling</li>
                          <li>SEO recomandation</li>
                          <li>Paraphrasing</li>
                          <li>Redudancy</li>
                        </ul>
                        <div className="pricing_price">
                          Starting at <br />
                          <svg
                            width="20"
                            height="26"
                            viewBox="0 0 21 32"
                            fill="none"
                            className="price_svg"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.405 7.11111C12.425 5.01333 10.325 3.55556 7.875 3.55556H0V0H21V3.55556H15.295C16.135 4.58667 16.765 5.79556 17.1325 7.11111H21V10.6667H17.465C17.0275 15.6444 12.8975 19.5556 7.875 19.5556H6.5975L18.375 32H13.5275L1.75 19.5556V16H7.875C10.955 16 13.51 13.6889 13.93 10.6667H0V7.11111H13.405Z"
                              fill="#333342"
                            />
                          </svg>
                          <span className="price_tag"> 3999/-</span> <br /> for
                          12 months
                        </div>
                        <button className="pricing_btn">Get Started</button>
                      </div>
                      <div className="pricing_card">
                        <h3>Half-yearly plan</h3>
                        <ul>
                          <li>Grammer Suggestion</li>
                          <li>Plagrism Report</li>
                          <li>Content Scheduling</li>
                          <li>SEO recomandation</li>
                          <li>Paraphrasing</li>
                          <li>Redudancy</li>
                        </ul>
                        <div className="pricing_price">
                          Starting at <br />
                          <svg
                            width="20"
                            height="25"
                            viewBox="0 0 21 32"
                            fill="none"
                            className="price_svg"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.405 7.11111C12.425 5.01333 10.325 3.55556 7.875 3.55556H0V0H21V3.55556H15.295C16.135 4.58667 16.765 5.79556 17.1325 7.11111H21V10.6667H17.465C17.0275 15.6444 12.8975 19.5556 7.875 19.5556H6.5975L18.375 32H13.5275L1.75 19.5556V16H7.875C10.955 16 13.51 13.6889 13.93 10.6667H0V7.11111H13.405Z"
                              fill="#333342"
                            />
                          </svg>
                          <span className="price_tag"> 3999/-</span> <br /> for
                          12 months
                        </div>
                        <button className="pricing_btn">Get Started</button>
                      </div>
                    </div>
                  </div>
                  <div className="basic">
                    <h5>Basic</h5>
                    <div className="pricing_cards_wrapper">
                      <div className="pricing_card">
                        <div>
                          <h3>Yearly Plan</h3>
                          <ul>
                            <li>Grammer Suggestion</li>
                            <li>Plagrism Report</li>
                          </ul>
                        </div>
                        <div>
                          <div className="pricing_price">
                            Starting at <br />
                            <svg
                              width="20"
                              height="26"
                              viewBox="0 0 21 32"
                              fill="none"
                              className="price_svg"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.405 7.11111C12.425 5.01333 10.325 3.55556 7.875 3.55556H0V0H21V3.55556H15.295C16.135 4.58667 16.765 5.79556 17.1325 7.11111H21V10.6667H17.465C17.0275 15.6444 12.8975 19.5556 7.875 19.5556H6.5975L18.375 32H13.5275L1.75 19.5556V16H7.875C10.955 16 13.51 13.6889 13.93 10.6667H0V7.11111H13.405Z"
                                fill="#333342"
                              />
                            </svg>
                            <span className="price_tag"> 3999/-</span> <br />{" "}
                            for 12 months
                          </div>
                          <button className="pricing_btn">Get Started</button>
                        </div>
                      </div>
                      <div className="pricing_card">
                        <div>
                          <h3>Half-Yearly Plan</h3>
                          <ul className="half_yearly_card">
                            <li>Grammer Suggestion</li>
                            <li>Plagrism Report</li>
                          </ul>
                        </div>
                        <div className="pricing_price">
                          Starting at <br />
                          <svg
                            width="20"
                            height="25"
                            viewBox="0 0 21 32"
                            fill="none"
                            className="price_svg"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.405 7.11111C12.425 5.01333 10.325 3.55556 7.875 3.55556H0V0H21V3.55556H15.295C16.135 4.58667 16.765 5.79556 17.1325 7.11111H21V10.6667H17.465C17.0275 15.6444 12.8975 19.5556 7.875 19.5556H6.5975L18.375 32H13.5275L1.75 19.5556V16H7.875C10.955 16 13.51 13.6889 13.93 10.6667H0V7.11111H13.405Z"
                              fill="#333342"
                            />
                          </svg>
                          <span className="price_tag"> 3999/-</span> <br /> for
                          12 months
                        </div>
                        <button className="pricing_btn">Get Started</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={
                  toggleState === 2
                    ? "clinic_content  active_clinic_content"
                    : "clinic_content"
                }
              >
                <div>
                  <div className="">2</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
