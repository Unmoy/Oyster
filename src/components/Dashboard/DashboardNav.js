import React from "react";
import "./Dashboard.css";
import search from "../../assets/images/search.png";
const DashboardNav = () => {
  return (
    <div className="DashboardNav">
      <img src={search} alt="search" className="search--icon" />
      <input
        type="text"
        className="dashboard_nav_input"
        placeholder="Search..."
      />
    </div>
  );
};

export default DashboardNav;
