import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser && !currentUser.uid) {
      navigate("/login");
      setLoading(true);
    }
  }, [currentUser]);

  return <UserContext.Provider>{!loading && children}</UserContext.Provider>;
};
