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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleShow = () => {
    setIsOpen(!isOpen);
    onToggle();
  };
  const isActive = () => (multiple ? isOpen : active);
  return (
    <div>
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
        {isActive() && (
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
                Do
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
                Ignore
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AccordianCard;
