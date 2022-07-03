import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../../assets/images/Oyster logo.png";
import profile from "../../../assets/images/prfimg.png";
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userDetails, setUserDetails] = useState();
  const token = localStorage.getItem("token");
  const fetchDetials = () => {
    fetch("https://oysterbackend.herokuapp.com/user/details", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const createNewDocument = () => {
    fetch("https://oysterbackend.herokuapp.com/document", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === "DOCUMENT_CREATED_SUCCESSFULLY") {
          navigate(`/texteditor/${data.id}`);
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    fetchDetials();
  }, [token]);
  return (
    <div className="sidemenu">
      <div className="sidemenu_brand">
        <img src={logo} alt="Logo" className="brand--logo" />
      </div>
      <div className="sidemenu_profile">
        <img src={profile} alt="" />
        <h5>{userDetails?.name}</h5>
        <p>{userDetails?.email}</p>
      </div>
      <div className="sidebar_menu">
        {/* Dashboard */}
        <NavLink
          to="monitor"
          className={(navLink) =>
            navLink.isActive || location.pathname === "/dashboard"
              ? "sidebar_menu_item checked"
              : "sidebar_menu_item"
          }
        >
          <div id="Dashboard">
            <svg
              className="menu--icon"
              width="25"
              height="25"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3H3V10H8V3Z"
                stroke="#AAAFFF"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17 3H11V7H17V3Z"
                stroke="#AAAFFF"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17 10H11V17H17V10Z"
                stroke="#AAAFFF"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 13H3V17H8V13Z"
                stroke="#AAAFFF"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="menu--text">Dashboard</span>
          </div>
        </NavLink>
        {/* Clinic */}

        <div
          onClick={() => {
            createNewDocument();
          }}
          to="/texteditor"
          className="sidebar_menu_div"
        >
          <div>
            <svg
              className="menu--icon"
              width="13"
              height="17"
              viewBox="0 0 13 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8264 4.26138L8.85256 0.178348C8.74176 0.064509 8.59219 0 8.43523 0H0.590909C0.264062 0 0 0.271317 0 0.607143V16.3929C0 16.7287 0.264062 17 0.590909 17H12.4091C12.7359 17 13 16.7287 13 16.3929V4.69208C13 4.5308 12.9372 4.37522 12.8264 4.26138ZM11.6372 4.97098H8.16193V1.40022L11.6372 4.97098ZM11.6705 15.6339H1.32955V1.36607H6.90625V5.46429C6.90625 5.67563 6.98796 5.87832 7.13341 6.02776C7.27886 6.1772 7.47612 6.26116 7.68182 6.26116H11.6705V15.6339ZM7.09091 7.74107C7.09091 7.65759 7.02443 7.58929 6.94318 7.58929H6.05682C5.97557 7.58929 5.90909 7.65759 5.90909 7.74107V9.79018H3.91477C3.83352 9.79018 3.76705 9.85848 3.76705 9.94196V10.8527C3.76705 10.9362 3.83352 11.0045 3.91477 11.0045H5.90909V13.0536C5.90909 13.1371 5.97557 13.2054 6.05682 13.2054H6.94318C7.02443 13.2054 7.09091 13.1371 7.09091 13.0536V11.0045H9.08523C9.16648 11.0045 9.23295 10.9362 9.23295 10.8527V9.94196C9.23295 9.85848 9.16648 9.79018 9.08523 9.79018H7.09091V7.74107Z"
                fill="#3F3B3C"
              />
            </svg>
            <span className="menu--text">New Document</span>
          </div>
        </div>
        {/* Patients */}
        <NavLink
          to="/pricing"
          className={(navLink) =>
            navLink.isActive ? "sidebar_menu_item checked" : "sidebar_menu_item"
          }
        >
          <div>
            <svg
              className="menu--icon"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.84371 0.389C2.90836 0.271273 3.00344 0.173065 3.11901 0.104638C3.23458 0.0362098 3.3664 7.22199e-05 3.50071 0H12.5007C12.635 7.22199e-05 12.7668 0.0362098 12.8824 0.104638C12.998 0.173065 13.0931 0.271273 13.1577 0.389L15.9077 5.389C15.9802 5.52088 16.0113 5.67151 15.997 5.82132C15.9828 5.97112 15.9238 6.11317 15.8277 6.229L15.5127 6.609C15.2406 6.19091 14.8682 5.84755 14.4295 5.61018C13.9907 5.37282 13.4996 5.249 13.0007 5.25C12.476 5.24992 11.9605 5.38745 11.5055 5.64887C11.0506 5.91029 10.6722 6.28646 10.4081 6.73983C10.1439 7.1932 10.0033 7.70791 10.0003 8.2326C9.99724 8.75729 10.1319 9.2736 10.3907 9.73L10.1777 10.272C9.57588 10.3504 9.02313 10.6451 8.62256 11.101C8.22199 11.557 8.00097 12.1431 8.00071 12.75C8.00071 12.964 8.01471 13.175 8.04071 13.38C8.11334 13.9428 8.29616 14.4858 8.57871 14.978C8.50834 15.0631 8.42004 15.1316 8.32013 15.1787C8.22021 15.2257 8.11115 15.2501 8.00071 15.2501C7.89028 15.2501 7.78121 15.2257 7.6813 15.1787C7.58138 15.1316 7.49308 15.0631 7.42271 14.978L0.172713 6.228C0.0766472 6.11217 0.0176461 5.97012 0.00337894 5.82032C-0.0108882 5.67051 0.0202386 5.51988 0.0927132 5.388L2.84271 0.388L2.84371 0.389ZM3.94371 1.5L2.15671 4.75H4.30671L5.44371 1.5H3.94371ZM6.07371 10.998L4.14371 6.25H2.13971L6.07471 10.998H6.07371ZM5.76371 6.25L7.98971 11.731L10.1507 6.25H5.76371ZM7.03371 1.5L5.89471 4.75H10.1747L8.97671 1.5H7.03271H7.03371ZM10.5767 1.5L11.7737 4.75H13.8447L12.0577 1.5H10.5767ZM10.1607 11.289C9.8308 11.3658 9.53659 11.552 9.32597 11.8172C9.11534 12.0825 9.0007 12.4113 9.00071 12.75C9.00071 12.922 9.01071 13.089 9.03271 13.25C9.0773 13.5965 9.17583 13.9339 9.32471 14.25C9.53371 14.688 9.83671 15.063 10.2127 15.365C10.9537 15.96 11.9477 16.25 13.0007 16.25C14.0537 16.25 15.0477 15.96 15.7887 15.365C16.5407 14.76 17.0007 13.866 17.0007 12.75C17.0007 12.3522 16.8427 11.9706 16.5614 11.6893C16.2801 11.408 15.8985 11.25 15.5007 11.25H10.5007C10.3837 11.25 10.2707 11.263 10.1607 11.289ZM14.8277 7.436C14.95 7.71093 15.0088 8.00992 14.9995 8.31069C14.9902 8.61147 14.9132 8.90628 14.7742 9.17315C14.6351 9.44002 14.4377 9.67208 14.1965 9.85204C13.9553 10.032 13.6766 10.1552 13.3812 10.2125C13.0858 10.2698 12.7813 10.2597 12.4903 10.1829C12.1993 10.1062 11.9295 9.96476 11.7007 9.7692C11.472 9.57365 11.2904 9.329 11.1694 9.0535C11.0483 8.77799 10.991 8.47873 11.0017 8.178C11.0187 7.705 11.1997 7.274 11.4897 6.94C11.7935 6.58811 12.2107 6.35337 12.6691 6.27632C13.1276 6.19928 13.5986 6.28476 14.0007 6.518C14.3647 6.728 14.6557 7.049 14.8277 7.436Z"
                fill="#3F3B3C"
              />
            </svg>

            <span className="menu--text_3">Upgrade to Premium</span>
          </div>
        </NavLink>
      </div>
      <div className="sidemenu_btn">
        <span
          onClick={() => {
            navigate("/logout");
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="logout_icon"
          >
            <path
              d="M19 22C19.2652 22 19.5196 21.8946 19.7071 21.7071C19.8946 21.5196 20 21.2652 20 21V3C20 2.73478 19.8946 2.48043 19.7071 2.29289C19.5196 2.10536 19.2652 2 19 2H5C4.73478 2 4.48043 2.10536 4.29289 2.29289C4.10536 2.48043 4 2.73478 4 3V6H6V4H18V20H6V18H4V21C4 21.2652 4.10536 21.5196 4.29289 21.7071C4.48043 21.8946 4.73478 22 5 22H19ZM6 16V13H13V11H6V8L1 12L6 16Z"
              fill="#FF1D25"
            />
          </svg>
          Logout
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
