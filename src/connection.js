import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

const connection = firebase.initializeApp({
  apiKey: "AIzaSyC23tYn1b8sjI--5BUofT7x7g9Nc91_m9w",
  authDomain: "airconditioner-27df7.firebaseapp.com",
  databaseURL: "https://airconditioner-27df7-default-rtdb.firebaseio.com",
  projectId: "airconditioner-27df7",
  storageBucket: "airconditioner-27df7.appspot.com",
  messagingSenderId: "661894351416",
  appId: "1:661894351416:web:329fc3a9047dd7cf13b4cd",
  measurementId: "G-XMVCEXXRGR"
  });
  const db = firebase.firestore();
  const storage = firebase.storage();
  const auth = firebase.auth();
  export {connection,db,storage,auth};