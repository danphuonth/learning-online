// src/components/Header.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Header({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header className="header">
      <nav className="nav-container">
        <div 
          className="logo" 
          onClick={() => navigate('/home')}
          style={{ cursor: 'pointer' }}
        >
          LearnHub
        </div>
        
        <ul className="nav-menu">
          <li>
            <a 
              className={`nav-link ${isActive('/home')}`}
              onClick={(e) => {
                e.preventDefault();
                navigate('/home');
              }}
            >
              Trang Chủ
            </a>
          </li>
          <li>
            <a 
              className={`nav-link ${isActive('/courses')}`}
              onClick={(e) => {
                e.preventDefault();
                navigate('/courses');
              }}
            >
              Khóa Học
            </a>
          </li>
          <li>
            <a 
              className={`nav-link ${isActive('/categories')}`}
              onClick={(e) => {
                e.preventDefault();
                navigate('/categories');
              }}
            >
              Danh Mục
            </a>
          </li>
        </ul>
        
        <div className="nav-actions">
          {user ? (
            <>
              <span style={{ marginRight: '1rem', fontWeight: '500' }}>
                Xin chào, {user.name}!
              </span>
              <button 
                className="btn btn-secondary"
                onClick={onLogout}
              >
                Đăng Xuất
              </button>
            </>
          ) : (
            <>
              <button 
                className="btn btn-secondary"
                onClick={() => navigate('/login')}
              >
                Đăng Nhập
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/register')}
              >
                Đăng Ký
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;