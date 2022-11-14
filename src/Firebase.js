// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAuth} from 'firebase/auth';

import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCAyCh-TTQ0aLq7kDpLsADCa4NAyrkBtRI",

  authDomain: "emiller-development.firebaseapp.com",

  projectId: "emiller-development",

  storageBucket: "emiller-development.appspot.com",

  messagingSenderId: "150290817244",

  appId: "1:150290817244:web:d7da174ae3001e46379419",

  measurementId: "G-LNSB52F8P6"


};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize FireStore


const auth =getAuth();

const db=getFirestore(app);

export{ app, auth,db};