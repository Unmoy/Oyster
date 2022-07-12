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

  const createNewDocument = () => {
    const token = localStorage.getItem("token");
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
        fetch("https://oysterbackend.herokuapp.com/user/login", {
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
            if (data.message === "LOGIN_SUCCESSFULL") {
              localStorage.setItem("id", data.id);
              localStorage.setItem("token", data.token);
              if (data.user) {
                const { uid, name, email, phone } = data.user;
                const { id } = data;
                setCurrentUser({ uid, name, email, phone, id });
                console.log(result);
                // navigate("/dashboard");
                createNewDocument();
              } else {
                const uid = user.uid;
                const name = user.displayName;
                const email = user.email;
                const { id } = data;
                setCurrentUser({ uid, name, email, id });
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
        fetch("https://oysterbackend.herokuapp.com/user/login", {
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
            if (data.message === "LOGIN_SUCCESSFULL") {
              setCurrentUser({ ...currentUser, id: data.id });
              localStorage.setItem("id", data.id);
              localStorage.setItem("token", data.token);
              if (data.user) {
                const { uid, name, email, phone } = data.user;
                const { id } = data;
                setCurrentUser({ uid, name, email, phone, id });
                // navigate("/dashboard");
                createNewDocument();
              } else {
                const uid = user.uid;
                const phone = user.phoneNumber;
                const { id } = data;
                setCurrentUser({ uid, phone, id });
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
    setCurrentUser({
      uid: "",
      name: "",
      phone: "",
      email: "",
      id: "",
    });

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
