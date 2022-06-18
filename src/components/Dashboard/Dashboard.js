import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./Dashboard.css";
import DashboardNav from "./DashboardNav";
const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard_outlet">
        <DashboardNav />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
