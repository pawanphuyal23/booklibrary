import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB6MvtXwFdoCJBQDSgpVxJVOpNN411J_hY",
  authDomain: "booklibrary-1d3a8.firebaseapp.com",
  databaseURL: "https://booklibrary-1d3a8-default-rtdb.firebaseio.com",
  projectId: "booklibrary-1d3a8",
  storageBucket: "booklibrary-1d3a8.firebasestorage.app",
  messagingSenderId: "1051859273704",
  appId: "1:1051859273704:web:b01c219b0a6ff4d7c6c65d",
  measurementId: "G-BE2WPLT03V"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

export const MAX_BORROWED_BOOKS = 3;