// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../config/firebase-config';

const AuthContext = createContext();

// Hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Đăng ký với Email/Password
  const signup = async (email, password, displayName, role = 'student') => {
    try {
      // Tạo user trong Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, {
        displayName: displayName
      });

      // Lưu thông tin user vào Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: email,
        displayName: displayName,
        role: role,
        photoURL: user.photoURL || null,
        createdAt: new Date().toISOString(),
        enrolledCourses: [],
        completedCourses: []
      });

      return { success: true, message: 'Đăng ký thành công!' };
    } catch (error) {
      console.error('Signup error:', error);
      let message = 'Đăng ký thất bại!';
      
      if (error.code === 'auth/email-already-in-use') {
        message = 'Email này đã được sử dụng!';
      } else if (error.code === 'auth/weak-password') {
        message = 'Mật khẩu quá yếu! Vui lòng dùng mật khẩu mạnh hơn.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Email không hợp lệ!';
      }
      
      return { success: false, message };
    }
  };

  // Đăng nhập với Email/Password
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, message: 'Đăng nhập thành công!' };
    } catch (error) {
      console.error('Login error:', error);
      let message = 'Đăng nhập thất bại!';
      
      if (error.code === 'auth/user-not-found') {
        message = 'Không tìm thấy tài khoản với email này!';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Mật khẩu không đúng!';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Email không hợp lệ!';
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Quá nhiều lần thử. Vui lòng thử lại sau!';
      }
      
      return { success: false, message };
    }
  };

  // Đăng nhập với Google
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Kiểm tra xem user đã tồn tại trong Firestore chưa
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        // Nếu chưa có, tạo mới
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: 'student',
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
          enrolledCourses: [],
          completedCourses: []
        });
      }

      return { success: true, message: 'Đăng nhập thành công!' };
    } catch (error) {
      console.error('Google login error:', error);
      let message = 'Đăng nhập với Google thất bại!';
      
      if (error.code === 'auth/popup-closed-by-user') {
        message = 'Bạn đã đóng cửa sổ đăng nhập!';
      } else if (error.code === 'auth/cancelled-popup-request') {
        message = 'Yêu cầu đăng nhập đã bị hủy!';
      }
      
      return { success: false, message };
    }
  };

  // Đăng xuất
  const logout = async () => {
    try {
      await signOut(auth);
      setUserInfo(null);
      return { success: true, message: 'Đăng xuất thành công!' };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, message: 'Đăng xuất thất bại!' };
    }
  };

  // Lấy thông tin user từ Firestore
  const fetchUserInfo = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setUserInfo(userDoc.data());
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  // Lắng nghe thay đổi auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        await fetchUserInfo(user.uid);
      } else {
        setUserInfo(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userInfo,
    signup,
    login,
    loginWithGoogle,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;