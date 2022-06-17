import React from "react";
import bg1 from "../../../assets/images/bg1.png";
import bg2 from "../../../assets/images/bg2.png";
import bg3 from "../../../assets/images/bg3.png";
import bg4 from "../../../assets/images/bg4.png";
import bg5 from "../../../assets/images/bg5.png";
import "./Content.css";
const Content = () => {
  return (
    <div className="content_wrapper">
      <img className="content_images1" src={bg1} alt="" />
      <img className="content_images2" src={bg2} alt="" />
      <img className="content_images3" src={bg3} alt="" />
      <img className="content_images4" src={bg4} alt="" />
      <img className="content_images5" src={bg5} alt="" />
      <div className="content_text">
        <h3>Write A Professional Content Copy With Oyster</h3>
        <p>
          What’s common between corporates looking to establish successful B2B
          synergies and SEO experts, and bloggers trying to prove their nuance
          in the writing industry? They all swear by the power of precise,
          error-free, and plagiarism free written content!
        </p>
        <button>Get Started</button>
      </div>
    </div>
  );
};

export default Content;
