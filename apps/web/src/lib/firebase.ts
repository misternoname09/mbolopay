import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBnBc7gSJDwzx7LZSN13aG5BWTVkSpyoIE",
  authDomain: "mbolopay-e8f78.firebaseapp.com",
  projectId: "mbolopay-e8f78",
  storageBucket: "mbolopay-e8f78.firebasestorage.app",
  messagingSenderId: "16849231290",
  appId: "1:16849231290:web:ead50989fa798974051183",
  measurementId: "G-X5LLD49JS9"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
