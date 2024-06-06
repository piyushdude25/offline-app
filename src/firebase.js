import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyDksEjSxJrjPJKlxP-bzWpxIE_7vQUaJhQ",
//   authDomain: "offline-app-6ec29.firebaseapp.com",
//   projectId: "offline-app-6ec29",
//   storageBucket: "offline-app-6ec29.appspot.com",
//   messagingSenderId: "589021606053",
//   appId: "1:589021606053:web:f68f1cb3752a8a71dadd4c",
// };
const firebaseConfig = {
  apiKey: "AIzaSyAYGeZ6ykUCgiMA85lQb0Ugp308cZ03kOg",
  authDomain: "financial-project-54d5e.firebaseapp.com",
  projectId: "financial-project-54d5e",
  storageBucket: "financial-project-54d5e.appspot.com",
  messagingSenderId: "260067951395",
  appId: "1:260067951395:web:8712644364e07bd4398296",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
