// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyBJUmpkVK_OaC5p3VdJYRoCqqxJs9w8ufM",
  authDomain: "smackchat-1fc87.firebaseapp.com",
  projectId: "smackchat-1fc87",
  storageBucket: "smackchat-1fc87.appspot.com",
  messagingSenderId: "1028721004821",
  appId: "1:1028721004821:web:8416304dafa26ae9ee191c"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()
let firebaseDB = firebaseApp.database()

export { firebaseAuth, firebaseDB, firebaseApp }
