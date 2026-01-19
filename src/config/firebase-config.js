// src/config/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Thay config này bằng config từ Firebase Console của bạn
// Truy cập: https://console.firebase.google.com/
// Project Settings > Your apps > Web app > Config
const firebaseConfig = {
  apiKey: "AIzaSyCeQT0-UUXEz9pYn-m1VUFIWVtpt6Tf4Qg",
  authDomain: "learnhub-online.firebaseapp.com",
  projectId: "learnhub-online",
  storageBucket: "learnhub-online.firebasestorage.app",
  messagingSenderId: "766719114764",
  appId: "1:766719114764:web:d5aed71197af60ebfab829"
};

// Khởi tạo Firebase
let app;
let auth;
let db;
let googleProvider;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
  
  // Cấu hình Google Provider
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
  
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  
  // Fallback: Tạo mock objects
  auth = {
    currentUser: null,
    onAuthStateChanged: () => {}
  };
  db = {};
  googleProvider = {};
}

export { auth, db, googleProvider };
export default app;