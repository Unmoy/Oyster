import React from "react";
import "./Contact.css";
import mask1 from "../../../assets/images/mask1.png";
import mask2 from "../../../assets/images/mask3.png";
const Contact = () => {
  return (
    <div className="contact_screen">
      <img className="mask_1" src={mask1} alt="" />
      <img className="mask_2" src={mask2} alt="" />
      <div className="contact_content">
        <h3>We’d Love to Hear From You!</h3>
        <p>
          You are one step closer to sorting your writing worries. Want to know
          how Oyster can help with your specific writing needs? Fill in the form
          and we will get in touch.
        </p>
        <button>Continue</button>
      </div>
    </div>
  );
};

export default Contact;
