import React, { useState } from "react";
import "./AccordianMenu.css";
import image from "../../assets/images/circle.png";
import downArrow from "../../assets/images/chevron-down.png";
import upArrow from "../../assets/images/chevron-up.png";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
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
  save,
  checkPlagarism,
  plagStatus,
  plagData,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [grammaropen, setGrammarOpen] = useState(true);
  return (
    <div className="d-flex flex-column">
      <div className="accordian_container">
        <ul className="accordian_ul">
          <li>
            {/* <input
              type="checkbox"
              defaultChecked={open}
              onClick={() => setOpen(true)}
            /> */}
            <div className="accordian_header">
              <h2 className="accordian_title">
                All Suggestions <p className="accordian_counter">2</p>
              </h2>
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
              <h2 className="accordian_title">
                Grammer Suggestions <p className="accordian_counter">2</p>
              </h2>
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
            {plagData && (
              <div className="accordian_card_container">
                {plagData.score ? (
                  <div className="plagarism_content">
                    <p>Identical Words:{plagData.score.identicalWords}</p>
                    <p>
                      Minor Changed Words:{plagData.score.minorChangedWords}
                    </p>
                    <p>Similar Words: {plagData.score.relatedMeaningWords}</p>
                    <p>Plagarism %: {plagData.score.aggregatedScore}%</p>
                  </div>
                ) : (
                  plagStatus === "pending" && (
                    <div className="">
                      <div className="accordian_sleleton">
                        <Skeleton width={130} />
                        <Skeleton width={130} />
                        <Skeleton width={130} />
                        <Skeleton width={130} />
                      </div>
                      <div className="accordian_sleleton_div">
                        <Skeleton height={60} />
                      </div>
                    </div>
                  )
                )}

                {plagData.internet &&
                  plagData.internet.map((plag, index) => {
                    return (
                      <div
                        className="accordian_card--parent"
                        key={index}
                        // onClick={() => {
                        //   navigate(plag.url);
                        // }}
                      >
                        <div className="accordian_card">
                          <h2>{plag.title}</h2>
                          <img src={image} alt="error" />
                        </div>
                        <div className="accordian_card--child">
                          <h2>{plag.introduction}</h2>
                          <a
                            href={plag.url}
                            target="_blank"
                            rel="noreferrer"
                            className="plag_url"
                          >
                            {plag.url}
                          </a>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
            <div className="d-flex justify-content-end">
              <button
                className="plagarism_check_btn"
                onClick={() => {
                  checkPlagarism(text);
                }}
                disabled={plagStatus === "pending"}
              >
                {plagStatus === "none"
                  ? "Plagrism Check"
                  : plagStatus === "pending"
                  ? "Checking"
                  : plagStatus === "completed"
                  ? "Check Again"
                  : ""}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordianMenu;
