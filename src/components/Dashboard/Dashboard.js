import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./Dashboard.css";
import DashboardNav from "./DashboardNav";
import { UserAuthProvider } from "../context/UserContext";
const Dashboard = () => {
  return (
    <UserAuthProvider>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard_outlet">
          <DashboardNav />
          <Outlet />
        </div>
      </div>
    </UserAuthProvider>
  );
};

export default Dashboard;
