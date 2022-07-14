import React, { useState } from "react";
import "./AccordianMenu.css";
import downArrow from "../../assets/images/chevron-down.png";
import upArrow from "../../assets/images/chevron-up.png";
import { motion } from "framer-motion";
import AccordianCard from "./AccordianCard";
import LoadingButton from "@mui/lab/LoadingButton";
const AccordianMenu = ({
  matches,
  correctText,
  text,
  checkPlagarism,
  plagStatus,
  plagData,
  addIgnoredWord,
  addIgnoredRule,
  setHover,
  resetHover,
  handleHover,
  multiple = false,
  setLoading,
  loading,
}) => {
  // const [open, setOpen] = useState(true);
  // const [grammaropen, setGrammarOpen] = useState(true);

  function handleClick() {
    setLoading(true);
    checkPlagarism(text);
  }
  const [active, setActive] = useState(0);
  return (
    <div>
      <motion.div layout className="accordian_container scroll_container">
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
                Grammer Suggestions{" "}
                {matches.length ? (
                  <p className="accordian_counter">{matches.length}</p>
                ) : (
                  ""
                )}
              </motion.h2>
              <img src={downArrow} alt="downArrow" />
            </motion.div>
            <div className="accordian_card_container">
              {matches.map((match, index) => (
                <AccordianCard
                  match={match}
                  resetHover={resetHover}
                  key={index}
                  text={text}
                  index={index}
                  correctText={correctText}
                  addIgnoredRule={addIgnoredRule}
                  addIgnoredWord={addIgnoredWord}
                  active={active === index}
                  multiple={multiple}
                  onToggle={(e) => setActive((a) => (a === index ? "" : index))}
                  handleHover={handleHover}
                  setHover={setHover}
                />
              ))}
            </div>
          </li>
        </ul>
      </motion.div>

      <div className="accordian_container">
        <div className="plagarism_card">
          <h1>Plagarism </h1>
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
                  " "
                )}

                {plagData.internet &&
                  plagData.internet.map((plag, index) => {
                    return (
                      <div className="plagarism_card_parent" key={index}>
                        <div className="plagarism_card_child">
                          <h2>{plag.introduction.substring(0, 30)}...</h2>
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
              <LoadingButton
                onClick={handleClick}
                loading={loading}
                loadingPosition="end"
                endIcon={<></>}
                variant="contained"
                disabled={plagStatus === "pending"}
                className="plagarism_check_btn"
              >
                {plagStatus === "none"
                  ? "Plagrism Check"
                  : loading
                  ? "Checking"
                  : plagStatus === "completed"
                  ? "Check Again"
                  : ""}
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordianMenu;
