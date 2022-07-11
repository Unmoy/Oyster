import React from "react";
import "./Dashboard.css";
import search from "../../assets/images/search.png";
const DashboardNav = ({ setSearchText }) => {
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <div className="DashboardNav">
      <img src={search} alt="search" className="search--icon" />
      <input
        type="text"
        className="dashboard_nav_input"
        placeholder="Search..."
        onChange={handleChange}
      />
    </div>
  );
};

export default DashboardNav;
