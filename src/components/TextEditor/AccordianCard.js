import React, { useState } from "react";
import { motion } from "framer-motion";
import image from "../../assets/images/circle.png";
const AccordianCard = ({
  match,
  text,
  index,
  addIgnoredWord,
  addIgnoredRule,
  multiple,
  onToggle,
  active,
  correctText,
  setHover,
  handleHover,
  resetHover,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleShow = () => {
    setIsOpen(!isOpen);
    // onToggle();
  };
  // const isActive = () => (multiple ? isOpen : active);
  return (
    <div
      onMouseEnter={() => {
        setHover(true);
        handleHover(match, index);
      }}
      onMouseLeave={() => {
        setHover(false);
        resetHover();
      }}
    >
      <motion.div
        className="accordian_card--parent"
        onClick={toggleShow}
        transition={{ layout: { duration: 1, type: "spring" } }}
        layout
      >
        <div className="accordian_card">
          <motion.h6 layout="position">
            {text?.substring(match.offset, match.offset + match.length)}
          </motion.h6>

          <motion.h2 layout="position">
            {match?.replacements[0]?.value}
          </motion.h2>
          <motion.img layout="position" src={image} alt="error" />
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="accordian_card--child"
          >
            <p>{match.message}</p>
            <div className="correction_cta d-flex justify-content-end">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  correctText(match, index);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  className="correct_svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  console.log(match);
                  if (match.shortMessage === "Spelling mistake") {
                    addIgnoredWord(match);
                  } else {
                    addIgnoredRule(match);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  className="correct_svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AccordianCard;
