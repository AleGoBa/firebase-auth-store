import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: "AIzaSyAFyLPi3-BbqJ-HRY-yZwZc9bdCcpJUEPk",
    authDomain: "fir-auth-vue-93916.firebaseapp.com",
    projectId: "fir-auth-vue-93916",
    storageBucket: "fir-auth-vue-93916.appspot.com",
    messagingSenderId: "372765100844",
    appId: "1:372765100844:web:427fd9fa833bf89a963a89"
};

const app = initializeApp(firebaseConfig);

const auth =  getAuth(app);
const db = getFirestore()


export {auth, db}