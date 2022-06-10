import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { authentication } from "../../firebase";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    uid: "",
    name: "",
    phone: "",
    email: "",
    id: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      if (user) {
        setCurrentUser({
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          id: "",
        });
        fetch("https://oysterbackend.herokuapp.com/auth/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.message === "LOGIN_SUCCESSFUL") {
              localStorage.setItem("id", data.id);
              setCurrentUser({ ...currentUser, id: data.id });
              if (data.user) {
                navigate("/dashboard");
              } else {
                navigate("/addDetails");
              }
            } else {
              console.log(data.message);
            }
          });
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  async function signInWithPhone(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
      },
      auth
    );
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }
  async function signInWithOtp(result, otp) {
    try {
      const res = await result.confirm(otp);
      const user = res.user;
      if (user) {
        console.log(user);
        setCurrentUser({
          phone: user.phoneNumber,
          uid: user.uid,
          id: "",
        });
        fetch("https://oysterbackend.herokuapp.com/auth/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: user.uid,
            phone: user.phoneNumber,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.message === "LOGIN_SUCCESSFUL") {
              setCurrentUser({ ...currentUser, id: data.id });
              localStorage.setItem("id", data.id);
              if (data.user) {
                navigate("/dashboard");
              } else {
                navigate("/addDetails");
              }
            } else {
              console.log(data.message);
            }
          });
      }
    } catch (err) {
      console.log(err);
    }
  }

  function logout() {
    auth.signOut();

    return;
  }

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({
          name: user._delegate.displayName,
          email: user._delegate.email,
          uid: user._delegate.uid,
          phone: user._delegate.phoneNumber,
          id: currentUser.id ? currentUser.id : "",
        });
      }

      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signInWithGoogle,
    signInWithPhone,
    signInWithOtp,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
