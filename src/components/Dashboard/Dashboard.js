import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./Dashboard.css";
import DashboardNav from "./DashboardNav";
import { UserAuthProvider } from "../context/UserContext";
import { useState } from "react";
const Dashboard = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <UserAuthProvider>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard_outlet">
          <DashboardNav setSearchText={setSearchText} />
          <Outlet context={[searchText]} />
        </div>
      </div>
    </UserAuthProvider>
  );
};

export default Dashboard;
