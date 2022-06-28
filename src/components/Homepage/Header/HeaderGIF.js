import React from "react";
import Lottie from "react-lottie";
import * as animationData from "./Oyster.2.json";
const HeaderGIF = () => {
  const defaultOptions = {
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      className: "lottie-svg-class",
    },
  };
  return (
    <div>
      <Lottie
        isClickToPauseDisabled
        options={defaultOptions}
        height={500}
        width={500}
      />
    </div>
  );
};

export default HeaderGIF;
