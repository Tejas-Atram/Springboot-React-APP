// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyANTwzd7xo5HdkS8o2HbONeNBsFqOmlUk8",
    authDomain: "springboot-react-portfol-725bf.firebaseapp.com",
    projectId: "springboot-react-portfol-725bf",
    storageBucket: "springboot-react-portfol-725bf.firebasestorage.app",
    messagingSenderId: "786398226665",
    appId: "1:786398226665:web:fe3f4e27f4558d77b52878",
    measurementId: "G-C7M7S1DCGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the auth instance so we can use it in our components
export const auth = getAuth(app);