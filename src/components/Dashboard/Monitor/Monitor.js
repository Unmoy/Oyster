import React, { useEffect, useState } from "react";
import StoryCard from "../StoryCard/StoryCard";
import "./Monitor.css";
const Monitor = () => {
  const [toggleState, setToggleState] = useState(1);
  const [documents, setDocuments] = useState([]);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const getDocuments = async () => {
    const token = localStorage.getItem("token");
    await fetch("https://oysterbackend.herokuapp.com/document/", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((result) => {
        setDocuments(result);
        console.log(result);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    getDocuments();
  }, []);
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
        <div className="story_content  active-story_content">
          <div className="d-flex flex-wrap">
            {documents.length > 0 &&
              documents.map((document) => {
                if (
                  toggleState === 1 ||
                  (toggleState === 2 && document.status === "Pending") ||
                  (toggleState === 3 && document.status === "Completed")
                ) {
                  return <StoryCard document={document} />;
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
