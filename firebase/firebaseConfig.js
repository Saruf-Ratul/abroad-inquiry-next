import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey:"AIzaSyDHXhcd-pKeYHz747CUeXOdb5uBVit33RM",
  authDomain: "abroad-inquiry-notification.firebaseapp.com",
  projectId:"abroad-inquiry-notification",
  storageBucket: "abroad-inquiry-notification.appspot.com",
  messagingSenderId: "611209054558",
  appId: "1:611209054558:web:e2aebe32417a40394aa7cf",
};


const app = initializeApp(firebaseConfig);
export const provider = new FacebookAuthProvider();
export const auth = getAuth(app)