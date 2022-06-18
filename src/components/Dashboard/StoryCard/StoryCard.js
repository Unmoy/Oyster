import React from "react";
import "./StoryCard.css";
const StoryCard = () => {
  return (
    <div className="story_card">
      <div className="story_card_text">
        <h1>Document Tilte</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod
        </p>
      </div>
      <div className="story_card_footer">
        <h4>Recent : 15 min ago</h4> <h5>260 words</h5>
      </div>
    </div>
  );
};

export default StoryCard;
