import React from "react";
import CarouselScreen from "./CarouselScreen/CarouselScreen";
import Contact from "./Contact/Contact";
import Content from "./Content/Content";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "./Homepage.css";
import Navbar from "./Navbar/Navbar";
const Homepage = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Content />
      <CarouselScreen />
      <Contact />
      <Footer />
    </div>
  );
};

export default Homepage;
