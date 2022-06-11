import React, { useState } from "react";
import "./AccordianMenu.css";
import image from "../../assets/images/circle.png";
import downArrow from "../../assets/images/chevron-down.png";
import upArrow from "../../assets/images/chevron-up.png";
const AccordianMenu = () => {
  const [open, setOpen] = useState(true);
  const [grammaropen, setGrammarOpen] = useState(true);
  return (
    <div>
      <div className="accordian_container">
        <ul className="accordian_ul">
          <li>
            <input
              type="checkbox"
              defaultChecked={open}
              onClick={() => setOpen(!open)}
            />
            <div className="accordian_header">
              <h2 className="accordian_title">All Suggestions</h2>
              <img src={open ? downArrow : upArrow} alt="" />
            </div>
            <div className="accordian_card_container">
              <div className="accordian_card">
                <h6>alibaba</h6>
                <h2>alibaba</h2>
                <img src={image} alt="" />
              </div>
              <div className="accordian_card">
                <h6>alibaba</h6>
                <h2>alibaba</h2>
                <img src={image} alt="" />
              </div>
              <div className="accordian_card">
                <h6>alibaba</h6>
                <h2>alibaba</h2>
                <img src={image} alt="" />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="accordian_container">
        <ul className="accordian_ul">
          <li>
            <input
              type="checkbox"
              defaultChecked={grammaropen}
              onClick={() => setGrammarOpen(!grammaropen)}
            />
            <div className="accordian_header">
              <h2 className="accordian_title">Grammer Suggestions</h2>
              <img src={grammaropen ? downArrow : upArrow} alt="" />
            </div>
            <div className="accordian_card_container">
              <div className="accordian_card">
                <h6>alibaba</h6>
                <h2>alibaba</h2>
                <img src={image} alt="" />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="accordian_container">
        <div className="plagarism_card">
          <h1>Plagarism</h1>
          <div className="d-flex justify-content-end">
            <button>Plagarism Check</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordianMenu;
