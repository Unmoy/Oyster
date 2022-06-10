import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDD3t-VeHsUpqFzTPJz4ddqrTwqmjeeJSI",
  authDomain: "oyster-reservefree.firebaseapp.com",
  projectId: "oyster-reservefree",
  storageBucket: "oyster-reservefree.appspot.com",
  messagingSenderId: "486739941640",
  appId: "1:486739941640:web:f360d7e769fd7d294c34bd",
});

export const authentication = app.auth();
export default app;
