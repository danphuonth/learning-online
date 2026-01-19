// src/pages/TeacherDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TeacherDashboard({ user }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
    activeClasses: 0
  });

  useEffect(() => {
    // Mock data - Thay bằng Firebase query
    setStats({
      totalCourses: 5,
      totalStudents: 234,
      totalRevenue: 45000000,
      activeClasses: 3
    });
  }, []);

  return (
    <div style={{ background: '#f8f9fa', minHeight: 'calc(100vh - 200px)', padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Welcome Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            👋 Xin chào, {user?.name || 'Giảng viên'}!
          </h1>
          <p style={{ color: '#666' }}>Đây là tổng quan về hoạt động giảng dạy của bạn</p>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚</div>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
              {stats.totalCourses}
            </h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Khóa học đang dạy</p>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
              {stats.totalStudents}
            </h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Học viên đã đăng ký</p>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
              {(stats.totalRevenue / 1000000).toFixed(1)}M
            </h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Doanh thu (VNĐ)</p>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
              {stats.activeClasses}
            </h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Lớp đang hoạt động</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ marginBottom: '1.5rem' }}>⚡ Thao tác nhanh</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <button
              onClick={() => navigate('/teacher/courses')}
              style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              📚 Quản lý khóa học
            </button>

            <button
              onClick={() => navigate('/teacher/students')}
              style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              👥 Danh sách học viên
            </button>

            <button
              onClick={() => navigate('/teacher/schedule')}
              style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              📅 Lịch dạy
            </button>

            <button
              onClick={() => alert('Tính năng đang phát triển')}
              style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              📊 Báo cáo & thống kê
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '1.5rem' }}>📝 Hoạt động gần đây</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: '✅', text: 'Học viên Nguyễn Văn A đã hoàn thành khóa React.js', time: '2 giờ trước' },
              { icon: '📝', text: 'Bạn đã thêm 3 bài học mới vào khóa Node.js', time: '5 giờ trước' },
              { icon: '⭐', text: 'Khóa học Python nhận được đánh giá 5 sao từ Trần Thị B', time: '1 ngày trước' },
              { icon: '👥', text: '5 học viên mới đăng ký khóa Web Development', time: '2 ngày trước' }
            ].map((activity, index) => (
              <div key={index} style={{
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{activity.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ marginBottom: '0.25rem' }}>{activity.text}</p>
                  <p style={{ fontSize: '0.85rem', color: '#999' }}>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;