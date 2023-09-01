import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBDZzo8dIrGW6wxfMhIzqwxlPhUPflKLrY",
  authDomain: "https://xenon-website.firebaseapp.com",
  databaseURL: "https://xenon-website.firebaseio.com",
  projectId: "xenon-website",
  storageBucket: "https://xenon-website.appspot.com",
  messagingSenderId: "900062586417",
  appId: "1:900062586417:web:8e223ddc3816b4de405710",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
