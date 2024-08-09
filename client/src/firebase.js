// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrQKnMvgrQZrAp1vwT__JjO9BcgxClbmo",
  authDomain: "donor-82405.firebaseapp.com",
  projectId: "donor-82405",
  storageBucket: "donor-82405.appspot.com",
  messagingSenderId: "297468141727",
  appId: "1:297468141727:web:e0c83d9a40b6b6d19902aa",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
