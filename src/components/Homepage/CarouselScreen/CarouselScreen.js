import React from "react";
import "./CarouselScreen.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bg4 from "../../../assets/images/bg4.png";
import bg7 from "../../../assets/images/bg7.png";
import sgimg from "../../../assets/images/sg-img.png";
import c2img from "../../../assets/images/c2img.png";
import c3img from "../../../assets/images/c3img.png";
import c4img from "../../../assets/images/c4img.png";

const CarouselScreen = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay: true,
  };
  return (
    <div className="carousel_screen">
      <img className="carousel_left_img" src={bg4} alt="" />
      <img className="carousel_right_img" src={bg7} alt="" />
      <div className="carousel_holder">
        <Slider {...settings}>
          <div className="carousel_card">
            <div>
              <h1 className="carousel_card_header">Grammer Suggestion</h1>
              <p className="carousel_card_description">
                Timing is one of the most important pillars of publishing
                content. Juggling multiple clients with all of them approaching
                a deadline can be baffling and frustrating. Schedule your
                content and publish it on all social platforms conveniently
                using Oyster
              </p>
            </div>
            <div className="sugestion_image_container">
              <img className="suggestion_img" src={sgimg} alt="" />
            </div>
          </div>
          <div className="carousel_card">
            <div>
              <h1 className="carousel_card_header_2">
                Content Scheduler To The Rescue
              </h1>
              <p className="carousel_card_description_2">
                Grammer Suggestion Grammer Suggestion People who do not use
                punctuation deserve a long sentence. Just kidding! Proofread
                like a pro! Oyster saves you from a smack in the face by
                checking your grammar and spelling, thereby increasing the
                credibility and readability of your content.
              </p>
            </div>
            <div className="scheduler_image_container">
              <img className="scheduler_img" src={c2img} alt="" />
            </div>
          </div>
          <div className="carousel_card">
            <div className="me-5">
              <h1 className="carousel_card_header">Plagiarism report</h1>
              <p className="carousel_card_description_3">
                Google is the 007 of the writing industry that has a powerful
                algorithm to identify plagiarized text. Save your reputation and
                find out if your content contains plagiarized sections before
                your Google does! Oyster provides an accurate plagiarism report
                in a jiffy
              </p>
            </div>
            <div className="plagiarism_image_container">
              <img className="plagiarism_img" src={c3img} alt="" />
            </div>
          </div>
          <div className="carousel_card">
            <div>
              <h1 className="carousel_card_header_2">
                Key is keyword research
              </h1>
              <p className="carousel_card_description_2">
                The best place to hide a dead body is page 2 of Google search
                results. Nobody cares what is beyond page 1! Please the SEO Gods
                with thorough keyword research. Select primary/ secondary
                keywords with Oyster and rank your pages on Google.
              </p>
            </div>
            <div className="research_image_container">
              <img className="research_img" src={c4img} alt="" />
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default CarouselScreen;
