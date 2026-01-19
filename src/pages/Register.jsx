// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../config/firebase-config';

function Register({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  // Đăng ký với Email/Password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (formData.name.length < 3) {
      setError('Họ tên phải có ít nhất 3 ký tự');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Email không hợp lệ');
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    setLoading(true);

    try {
      // Tạo user trong Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      const user = userCredential.user;

      // Cập nhật display name
      await updateProfile(user, {
        displayName: formData.name
      });

      // Lưu thông tin user vào Firestore
      try {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: formData.email,
          displayName: formData.name,
          role: 'student',
          photoURL: user.photoURL || null,
          createdAt: new Date().toISOString(),
          enrolledCourses: [],
          completedCourses: []
        });
      } catch (firestoreError) {
        console.error('Firestore error:', firestoreError);
        // Không fail toàn bộ quá trình nếu Firestore lỗi
      }

      const userData = {
        uid: user.uid,
        email: user.email,
        name: formData.name,
        displayName: formData.name,
        photoURL: user.photoURL
      };
      
      onLogin(userData);
      alert('✅ Đăng ký thành công! Chào mừng bạn đến với LearnHub!');
      navigate('/home');
    } catch (error) {
      console.error('Register error:', error);
      
      let errorMessage = 'Đăng ký thất bại';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email này đã được sử dụng';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email không hợp lệ';
          break;
        case 'auth/weak-password':
          errorMessage = 'Mật khẩu quá yếu. Vui lòng dùng mật khẩu mạnh hơn';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Lỗi kết nối mạng';
          break;
        default:
          errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Đăng ký với Google
  const handleGoogleSignup = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Lưu thông tin user vào Firestore (nếu chưa có)
      try {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: 'student',
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
          enrolledCourses: [],
          completedCourses: []
        }, { merge: true }); // merge: true để không ghi đè nếu đã tồn tại
      } catch (firestoreError) {
        console.error('Firestore error:', firestoreError);
      }
      
      const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || user.email.split('@')[0],
        displayName: user.displayName,
        photoURL: user.photoURL
      };
      
      onLogin(userData);
      alert('✅ Đăng ký Google thành công! Chào mừng bạn đến với LearnHub!');
      navigate('/home');
    } catch (error) {
      console.error('Google signup error:', error);
      
      let errorMessage = 'Đăng ký với Google thất bại';
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Bạn đã đóng cửa sổ đăng nhập';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Yêu cầu đăng nhập đã bị hủy';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Popup bị chặn. Vui lòng cho phép popup';
          break;
        case 'auth/account-exists-with-different-credential':
          errorMessage = 'Email này đã được đăng ký bằng phương thức khác';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Lỗi kết nối mạng';
          break;
        default:
          errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '500px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        maxHeight: '95vh',
        overflowY: 'auto'
      }}>
        {/* Logo */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          cursor: 'pointer'
        }}
        onClick={() => navigate('/home')}
        >
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem'
          }}>
            LearnHub
          </h1>
          <p style={{ color: '#666', fontSize: '1rem' }}>
            Tạo tài khoản để bắt đầu học tập
          </p>
        </div>

        {/* Google Signup Button */}
        <button 
          type="button"
          onClick={handleGoogleSignup}
          disabled={loading}
          style={{
            width: '100%',
            padding: '1rem',
            background: 'white',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            transition: 'all 0.3s',
            boxSizing: 'border-box'
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.backgroundColor = '#f9fafb';
              e.target.style.borderColor = '#667eea';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'white';
            e.target.style.borderColor = '#e5e7eb';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path fill="#4285F4" d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"/>
            <path fill="#34A853" d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"/>
            <path fill="#FBBC05" d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"/>
            <path fill="#EA4335" d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"/>
          </svg>
          {loading ? 'Đang đăng ký...' : 'Đăng ký với Google'}
        </button>

        {/* Divider */}
        <div style={{
          position: 'relative',
          textAlign: 'center',
          margin: '1.5rem 0'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '1px',
            background: '#e5e7eb'
          }}></div>
          <span style={{
            position: 'relative',
            background: 'white',
            padding: '0 1rem',
            color: '#9ca3af',
            fontSize: '0.9rem'
          }}>hoặc</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              padding: '1rem',
              marginBottom: '1.5rem',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              borderRadius: '8px',
              fontSize: '0.9rem',
              textAlign: 'center',
              border: '1px solid #fecaca'
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600',
              color: '#374151'
            }}>
              Họ và tên *
            </label>
            <input 
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.875rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600',
              color: '#374151'
            }}>
              Email *
            </label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.875rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600',
              color: '#374151'
            }}>
              Mật khẩu *
            </label>
            <input 
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Tối thiểu 6 ký tự"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.875rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600',
              color: '#374151'
            }}>
              Xác nhận mật khẩu *
            </label>
            <input 
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.875rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              fontSize: '0.9rem',
              color: '#6b7280'
            }}>
              <input 
                type="checkbox"
                required
                style={{ width: '18px', height: '18px' }}
              />
              <span>
                Tôi đồng ý với{' '}
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Điều khoản sử dụng');
                  }}
                  style={{ color: '#667eea', textDecoration: 'underline' }}
                >
                  Điều khoản sử dụng
                </a>
              </span>
            </label>
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: loading ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'transform 0.2s',
              boxSizing: 'border-box'
            }}
            onMouseEnter={(e) => {
              if (!loading) e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
            }}
          >
            {loading ? 'Đang đăng ký...' : 'Đăng Ký'}
          </button>
        </form>

        {/* Footer Links */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '1.5rem',
          color: '#6b7280',
          fontSize: '0.95rem'
        }}>
          Đã có tài khoản?{' '}
          <a 
            href="/login"
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
            style={{ 
              color: '#667eea',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
          >
            Đăng nhập ngay
          </a>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <a 
            href="/home"
            onClick={(e) => {
              e.preventDefault();
              navigate('/home');
            }}
            style={{ 
              color: '#9ca3af',
              fontSize: '0.9rem',
              textDecoration: 'none'
            }}
          >
            ← Quay về trang chủ
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;