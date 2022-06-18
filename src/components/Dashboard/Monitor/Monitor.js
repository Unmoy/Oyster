import React, { useState } from "react";
import StoryCard from "../StoryCard/StoryCard";
import "./Monitor.css";
const Monitor = () => {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="story_tab_container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          All
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Pending
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Completed
        </button>
      </div>
      <div className="story_content_tabs">
        <div
          className={
            toggleState === 1
              ? "story_content  active-story_content"
              : "story_content"
          }
        >
          <div className="d-flex flex-wrap">
            <StoryCard />
            <StoryCard />
            <StoryCard />
          </div>
        </div>

        <div
          className={
            toggleState === 2
              ? "story_content  active-story_content"
              : "story_content"
          }
        >
          <div>pending</div>
        </div>
        <div
          className={
            toggleState === 3
              ? "story_content  active-story_content"
              : "story_content"
          }
        >
          <div>Completed</div>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
