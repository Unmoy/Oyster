import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuList } from "./MenuList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/images/Oyster logo.png";
import "./Navbar.css";
const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <nav className="NavbarItems">
      <div className="logoWrappper">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </div>
      <div className="menu_icon" onClick={handleClick}>
        <FontAwesomeIcon icon={clicked ? faTimes : faBars} />
      </div>
      <div className="menulistwrapper">
        <ul className={clicked ? `nav_menu active` : `nav_menu`}>
          <div className="menu_box">
            {MenuList.map((item, index) => {
              return (
                <li key={index}>
                  <Link className="nav_link navigator" to={item.url}>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </div>
          <div className="auth_btn">
            {/* {currentUser.user_email ? (
            <button className="signin_link">{currentUser.user_name}</button>
          ) : (
            <Link to="/login">
              <button className="signin_link">Sign In</button>
            </Link>
          )} */}
          </div>
          <div className="auth_btn">
            {/* {currentUser.user_name ? (
            <button className="signout_link" onClick={handleLogout}>
              Logout
            </button>
          ) : null} */}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
