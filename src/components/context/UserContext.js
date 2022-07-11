import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function check() {
      if (!token) {
        navigate("/login");
        setLoading(true);
      } else {
        setLoading(true);
        fetch("https://oysterbackend.herokuapp.com/user/login", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result === true) {
              setLoading(false);
            } else {
              setLoading(true);
              navigate("/login");
            }
          })
          .catch((error) => {
            console.log("error", error);
            navigate("/login");
            setLoading(true);
          });
      }
      if (currentUser && !currentUser.uid) {
        navigate("/login");
        setLoading(true);
      }
    }
    check();
  }, [currentUser, token]);
  const value = {
    currentUser,
  };
  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};
