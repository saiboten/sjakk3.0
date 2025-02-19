import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const configBeta = {
  apiKey: "AIzaSyBdvsddep5CAnAJVIGSgI3RvZfq5gji9Dw",
  authDomain: "sjakk-beta.firebaseapp.com",
  databaseURL: "https://sjakk-beta.firebaseio.com",
  projectId: "sjakk-beta",
  storageBucket: "",
  messagingSenderId: "26458714233",
};

var configProd = {
  apiKey: "AIzaSyA50wklLQomXTwt9jTXBQhzQoJBmtWSyoU",
  authDomain: "sjakk-3bc2d.firebaseapp.com",
  databaseURL: "https://sjakk-3bc2d.firebaseio.com",
  projectId: "sjakk-3bc2d",
  storageBucket: "sjakk-3bc2d.appspot.com",
  messagingSenderId: "84685046486",
};

const app = firebase.initializeApp(configProd);

export default app;
