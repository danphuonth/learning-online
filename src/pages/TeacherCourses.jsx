// src/pages/TeacherCourses.jsx
import React, { useState, useEffect } from 'react';

function TeacherCourses({ user }) {
  const [courses, setCourses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    duration: ''
  });

  useEffect(() => {
    // Mock data - Thay bằng Firebase query
    setCourses([
      {
        id: 1,
        title: 'React.js Toàn Tập',
        category: 'Frontend',
        students: 85,
        price: 1299000,
        status: 'active',
        lessons: 45,
        rating: 4.8
      },
      {
        id: 2,
        title: 'Node.js Backend',
        category: 'Backend',
        students: 62,
        price: 1599000,
        status: 'active',
        lessons: 38,
        rating: 4.9
      },
      {
        id: 3,
        title: 'Python Cơ Bản',
        category: 'Programming',
        students: 120,
        price: 999000,
        status: 'draft',
        lessons: 30,
        rating: 4.7
      }
    ]);
  }, []);

  const handleAddCourse = (e) => {
    e.preventDefault();
    // TODO: Save to Firebase
    alert('Khóa học đã được tạo!');
    setShowAddModal(false);
    setNewCourse({ title: '', description: '', category: '', price: '', duration: '' });
  };

  return (
    <div style={{ background: '#f8f9fa', minHeight: 'calc(100vh - 200px)', padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚 Quản lý khóa học</h1>
            <p style={{ color: '#666' }}>Quản lý và cập nhật các khóa học của bạn</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            ➕ Tạo khóa học mới
          </button>
        </div>

        {/* Courses Grid */}
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {courses.map(course => (
            <div key={course.id} style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '1.5rem',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{course.title}</h3>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: course.status === 'active' ? '#d1fae5' : '#fef3c7',
                    color: course.status === 'active' ? '#065f46' : '#92400e',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    {course.status === 'active' ? '🟢 Đang hoạt động' : '🟡 Bản nháp'}
                  </span>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.25rem' }}>Danh mục</p>
                    <p style={{ fontWeight: '600' }}>{course.category}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.25rem' }}>Học viên</p>
                    <p style={{ fontWeight: '600' }}>👥 {course.students}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.25rem' }}>Bài học</p>
                    <p style={{ fontWeight: '600' }}>📝 {course.lessons}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.25rem' }}>Đánh giá</p>
                    <p style={{ fontWeight: '600' }}>⭐ {course.rating}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.25rem' }}>Giá</p>
                    <p style={{ fontWeight: '600', color: '#667eea' }}>
                      {(course.price / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button style={{
                  padding: '0.75rem 1.5rem',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}>
                  ✏️ Chỉnh sửa
                </button>
                <button style={{
                  padding: '0.75rem 1.5rem',
                  background: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}>
                  👥 Học viên
                </button>
                <button style={{
                  padding: '0.75rem 1.5rem',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}>
                  🗑️ Xóa
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Course Modal */}
        {showAddModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
          onClick={(e) => e.target.style.position === 'fixed' && setShowAddModal(false)}
          >
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{ marginBottom: '1.5rem' }}>➕ Tạo khóa học mới</h2>

              <form onSubmit={handleAddCourse}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Tên khóa học *
                  </label>
                  <input
                    type="text"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                    placeholder="VD: React.js Toàn Tập"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Mô tả *
                  </label>
                  <textarea
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                    placeholder="Mô tả chi tiết về khóa học..."
                    required
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Danh mục *
                    </label>
                    <select
                      value={newCourse.category}
                      onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="">Chọn danh mục</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Mobile">Mobile</option>
                      <option value="AI/ML">AI/ML</option>
                      <option value="Design">Design</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Giá (VNĐ) *
                    </label>
                    <input
                      type="number"
                      value={newCourse.price}
                      onChange={(e) => setNewCourse({...newCourse, price: e.target.value})}
                      placeholder="999000"
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: '#e5e7eb',
                      color: '#374151',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Tạo khóa học
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherCourses;