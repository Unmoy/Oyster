import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      logout();
    }
    if (currentUser && !currentUser.uid) {
      navigate("/login");
    }
    localStorage.setItem("token", "");
    localStorage.setItem("id", "");
  }, [currentUser]);
  return <>Logout</>;
};

export default Logout;
