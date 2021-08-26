import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
const config = {
  apiKey: "AIzaSyANcxNu4d2p1rduXx1sKppGk3zcC13vT7M",
  authDomain: "delobot-81fd4.firebaseapp.com",
  databaseURL: "https://delobot-81fd4-default-rtdb.firebaseio.com",
  projectId: "delobot-81fd4",
  storageBucket: "delobot-81fd4.appspot.com",
  messagingSenderId: "441957292442",
  appId: "1:441957292442:web:7556f9e86e30ccca488223",
  measurementId: "G-5ECXCN6G2T",
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
