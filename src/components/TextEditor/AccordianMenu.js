import React, { useState } from "react";
import "./AccordianMenu.css";
import image from "../../assets/images/circle.png";
import downArrow from "../../assets/images/chevron-down.png";
import upArrow from "../../assets/images/chevron-up.png";
const AccordianMenu = ({
  handleHover,
  setHover,
  matches,
  correctText,
  text,
  check,
  handlesubmit,
  title,
  setRawText,
}) => {
  const [open, setOpen] = useState(true);
  const [grammaropen, setGrammarOpen] = useState(true);
  return (
    <div>
      <div className="accordian_container">
        <ul className="accordian_ul">
          <li>
            {/* <input
              type="checkbox"
              defaultChecked={open}
              onClick={() => setOpen(true)}
            /> */}
            <div className="accordian_header">
              <h2 className="accordian_title">All Suggestions</h2>
              <img src={open ? downArrow : upArrow} alt="" />
            </div>
            <div className="accordian_card_container">
              {matches.map((match, index) => (
                <div
                  className="accordian_card--parent"
                  key={index}
                  onMouseEnter={() => {
                    setHover(true);
                    // handleHover(match, index);
                  }}
                  onMouseLeave={() => {
                    // setHover(false);
                    // setRawText(text);
                    // console.log("leave", match.shortMessage);
                  }}
                  onClick={() => {
                    correctText(match, index);
                    // console.log(match);
                  }}
                >
                  <div className="accordian_card">
                    <h6>
                      {text?.substr(match.offset, match.offset + match.length)}
                    </h6>

                    <h2>{match?.replacements[0]?.value}</h2>
                    <img src={image} alt="error" />
                  </div>
                  <div className="accordian_card--child">
                    <h2>{match.shortMessage}</h2>
                    <p>{match.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </li>
        </ul>
      </div>
      <div className="accordian_container">
        <ul className="accordian_ul">
          <li>
            {/* <input
              type="checkbox"
              defaultChecked={grammaropen}
              onClick={() => setGrammarOpen(!grammaropen)}
            /> */}
            <div className="accordian_header">
              <h2 className="accordian_title">Grammer Suggestions</h2>
              <img src={grammaropen ? downArrow : upArrow} alt="" />
            </div>
            <div className="accordian_card_container">
              {matches.map((match, index) => {
                return match.shortMessage === "Spelling mistake" ? (
                  ""
                ) : (
                  <div
                    className="accordian_card--parent"
                    key={index}
                    onMouseEnter={() => {
                      // setHover(true);
                      // handleHover(match, index);
                    }}
                    onMouseLeave={() => {
                      // setHover(false);
                      // setRawText(text);
                      // console.log("leave");
                    }}
                    onClick={() => {
                      correctText(match, index);
                      // console.log(match);
                    }}
                  >
                    <div className="accordian_card">
                      <h6>
                        {text?.substr(
                          match.offset,
                          match.offset + match.length
                        )}
                      </h6>

                      <h2>{match?.replacements[0]?.value}</h2>
                      <img src={image} alt="error" />
                    </div>
                    <div className="accordian_card--child">
                      <h2>{match.shortMessage}</h2>
                      <p>{match.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </li>
        </ul>
      </div>
      <div className="accordian_container">
        <div className="plagarism_card">
          <h1>Plagarism</h1>
          <div className="d-flex flex-column justify-content-end">
            <button disabled>Plagarism Check</button>
            <button
              onClick={() => {
                check();
              }}
            >
              Grammar Check
            </button>
            <button
              onClick={() => {
                handlesubmit("Pending");
              }}
              disabled={!text || !title}
            >
              Save Document
            </button>
            <button
              onClick={() => {
                handlesubmit("Completed");
              }}
              disabled={!text || !title}
            >
              Submit Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordianMenu;
