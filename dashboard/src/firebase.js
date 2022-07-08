// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmsgcpe_QsWiNxGa5l8zeylWQO6Jz1FKg",
  authDomain: "theinsights-mall.firebaseapp.com",
  projectId: "theinsights-mall",
  storageBucket: "theinsights-mall.appspot.com",
  messagingSenderId: "533069834968",
  appId: "1:533069834968:web:8651578f35c44b6b0ac5ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app