import React from "react";
// import Lottie from "react-lottie";
import Lottie from "lottie-react";
import * as animationData from "./Comp 1.json";
const HeaderGIF = () => {
  // const defaultOptions = {
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //     className: "lottie-svg-class",
  //   },
  // };

  return (
    <div className="lottie_animation">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default HeaderGIF;
