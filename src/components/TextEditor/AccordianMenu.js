import React, { useState } from "react";
import "./AccordianMenu.css";
import image from "../../assets/images/circle.png";
import downArrow from "../../assets/images/chevron-down.png";
import upArrow from "../../assets/images/chevron-up.png";
// import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AccordianCard from "./AccordianCard";
import LinearProgress from "@mui/material/LinearProgress";
// import { LoadingButton } from "@mui/lab";
const AccordianMenu = ({
  matches,
  correctText,
  text,
  checkPlagarism,
  plagStatus,
  plagData,
  addIgnoredWord,
  addIgnoredRule,
  multiple = false,
}) => {
  const [open, setOpen] = useState(true);
  const [grammaropen, setGrammarOpen] = useState(true);
  const [loading, setLoading] = React.useState(true);
  function handleClick() {
    setLoading(true);
  }
  const [active, setActive] = useState(0);
  const [grammarActive, setGrammarActive] = useState(0);
  return (
    <div className="accordian_menu">
      <motion.div layout className="accordian_container ">
        <ul className="accordian_ul">
          <li>
            {/* <input
              type="checkbox"
              defaultChecked={open}
              onClick={() => setOpen(true)}
            /> */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ layout: { duration: 1, type: "spring" } }}
              layout
              className="accordian_header"
            >
              <motion.h2 className="accordian_title">
                All Suggestions{" "}
                <p className="accordian_counter">{matches.length}</p>
              </motion.h2>
              <img src={open ? downArrow : upArrow} alt="" />
            </motion.div>
            <div className="accordian_card_container">
              {matches.map((match, index) => (
                <AccordianCard
                  match={match}
                  key={index}
                  text={text}
                  index={index}
                  correctText={correctText}
                  addIgnoredRule={addIgnoredRule}
                  addIgnoredWord={addIgnoredWord}
                  active={active === index}
                  multiple={multiple}
                  onToggle={(e) => setActive((a) => (a === index ? "" : index))}
                />
              ))}
            </div>
          </li>
        </ul>
      </motion.div>
      <motion.div className="accordian_container">
        <ul className="accordian_ul">
          <li>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ layout: { duration: 1, type: "spring" } }}
              layout
              className="accordian_header"
            >
              <motion.h2 className="accordian_title">
                Grammer Suggestions{" "}
                <p className="accordian_counter">{matches.length}</p>
              </motion.h2>
              <img src={grammaropen ? downArrow : upArrow} alt="" />
            </motion.div>
            <div className="accordian_card_container">
              {matches.map((match, index) => {
                return match.shortMessage === "Spelling mistake" ? (
                  ""
                ) : (
                  // <div
                  //   className="accordian_card--parent"
                  //   key={index}
                  //   onClick={() => {
                  //     correctText(match, index);
                  //   }}
                  // >
                  //   <div className="accordian_card">
                  //     <h6>
                  //       {text?.substring(
                  //         match.offset,
                  //         match.offset + match.length
                  //       )}
                  //     </h6>

                  //     <h2>{match?.replacements[0]?.value}</h2>
                  //     <img src={image} alt="error" />
                  //   </div>
                  //   <div className="accordian_card--child">
                  //     <h2>{match.shortMessage}</h2>
                  //     <p>{match.message}</p>
                  //   </div>
                  //   </div>
                  <AccordianCard
                    match={match}
                    key={index}
                    text={text}
                    index={index}
                    correctText={correctText}
                    addIgnoredRule={addIgnoredRule}
                    addIgnoredWord={addIgnoredWord}
                    active={grammarActive === index}
                    multiple={multiple}
                    onToggle={(e) =>
                      setGrammarActive((a) => (a === index ? "" : index))
                    }
                  />
                );
              })}
            </div>
          </li>
        </ul>
      </motion.div>
      <div className="accordian_container">
        <div className="plagarism_card">
          <h1>Plagarism</h1>
          {/* <LinearProgress variant="query" height={100} /> */}
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
                      <LinearProgress variant="query" />
                      {/* <div className="accordian_sleleton">
                        <Skeleton width={130} />
                        <Skeleton width={130} />
                        <Skeleton width={130} />
                        <Skeleton width={130} />
                      </div>
                      <div className="accordian_sleleton_div">
                        <Skeleton height={60} />
                      </div> */}
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
              {/* <LoadingButton
                size="small"
                onClick={handleClick}
                // endIcon={<SendIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
              >
                Send
              </LoadingButton> */}
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
