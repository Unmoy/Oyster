import React from "react";
// import Lottie from "react-lottie";
import Lottie from "lottie-react";
import * as animationData from "./Comp 1.json";
const HeaderGIF = () => {
  const defaultOptions = {
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      className: "lottie-svg-class",
    },
  };
  const style = {
    // backgroundColor: "red",
    // width: "740px",
    // position: "absolute",
    // left: 0,
    // top: 0,
    // width: 600,
  };
  return (
    <div className="lottie_animation">
      <Lottie animationData={animationData} loop={true} style={style} />
    </div>
  );
};

export default HeaderGIF;
