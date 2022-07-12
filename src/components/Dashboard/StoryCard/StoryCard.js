import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StoryCard.css";
const StoryCard = ({ document }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(new Date(document?.lastModified).toString().substring(0, 15));
    // console.log(date);
  }, [document]);
  // First 2 words in the title
  const title = document?.title?.split(" ").slice(0, 2).join(" ");
  console.log(title);
  return (
    <div
      className="story_card"
      onClick={() => {
        navigate(`/texteditor/${document._id}`);
      }}
    >
      <div className="story_card_text">
        <h1>
          {document?.title
            ? `${document?.title?.length > 15 ? `${title}...` : title}`
            : "Untitled"}
        </h1>
        <p>{document?.content?.substring(0, 145)}...</p>
      </div>
      <div className="story_card_footer">
        <h4>Recent: {date}</h4>
        <h5>{document?.content?.length} words</h5>
      </div>
    </div>
  );
};

export default StoryCard;
