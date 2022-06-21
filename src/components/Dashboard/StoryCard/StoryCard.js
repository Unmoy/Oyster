import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StoryCard.css";
const StoryCard = ({ document }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(new Date(document?.lastModified).toString().substring(0, 15));
    console.log(date);
  }, [document]);
  return (
    <div
      className="story_card"
      onClick={() => {
        navigate(`/texteditor/${document._id}`);
      }}
    >
      <div className="story_card_text">
        <h1>{document?.title}</h1>
        <p>{document?.content}</p>
      </div>
      <div className="story_card_footer">
        <h4>Recent : {date}</h4>
        <h5>{document?.content?.length} words</h5>
      </div>
    </div>
  );
};

export default StoryCard;
