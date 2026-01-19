// src/pages/TeacherStudents.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TeacherStudents({ user }) {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    // Mock data - Thay bằng Firebase query
    setStudents([
      {
        id: 1,
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@email.com',
        avatar: '👨',
        enrolledCourses: ['React.js Toàn Tập', 'Node.js Backend'],
        totalCourses: 2,
        completedLessons: 45,
        progress: 75,
        lastActive: '2 giờ trước',
        joinDate: '15/10/2024',
        rating: 4.8
      },
      {
        id: 2,
        name: 'Trần Thị B',
        email: 'tranthib@email.com',
        avatar: '👩',
        enrolledCourses: ['Python Cơ Bản'],
        totalCourses: 1,
        completedLessons: 28,
        progress: 93,
        lastActive: '1 ngày trước',
        joinDate: '20/09/2024',
        rating: 5.0
      },
      {
        id: 3,
        name: 'Lê Văn C',
        email: 'levanc@email.com',
        avatar: '👨',
        enrolledCourses: ['React.js Toàn Tập', 'Python Cơ Bản'],
        totalCourses: 2,
        completedLessons: 32,
        progress: 42,
        lastActive: '5 giờ trước',
        joinDate: '01/11/2024',
        rating: 4.5
      },
      {
        id: 4,
        name: 'Phạm Thị D',
        email: 'phamthid@email.com',
        avatar: '👩',
        enrolledCourses: ['Node.js Backend'],
        totalCourses: 1,
        completedLessons: 15,
        progress: 39,
        lastActive: '3 ngày trước',
        joinDate: '10/11/2024',
        rating: 4.2
      },
      {
        id: 5,
        name: 'Hoàng Văn E',
        email: 'hoangvane@email.com',
        avatar: '👨',
        enrolledCourses: ['React.js Toàn Tập'],
        totalCourses: 1,
        completedLessons: 60,
        progress: 100,
        lastActive: '1 giờ trước',
        joinDate: '05/08/2024',
        rating: 5.0
      }
    ]);
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = filterCourse === 'all' || 
                         student.enrolledCourses.includes(filterCourse);
    return matchesSearch && matchesCourse;
  });

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  const handleSendMessage = (student) => {
    alert(`Gửi tin nhắn cho ${student.name}`);
  };

  return (
    <div style={{ background: '#f8f9fa', minHeight: 'calc(100vh - 200px)', padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥 Danh sách học viên</h1>
          <p style={{ color: '#666' }}>Quản lý và theo dõi tiến độ học tập của học viên</p>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
              {students.length}
            </h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Tổng học viên</p>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
              {students.filter(s => s.progress === 100).length}
            </h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Hoàn thành khóa học</p>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
              {Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)}%
            </h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Tiến độ trung bình</p>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
              {(students.reduce((acc, s) => acc + s.rating, 0) / students.length).toFixed(1)}
            </h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Đánh giá trung bình</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="🔍 Tìm kiếm học viên theo tên hoặc email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                width: '100%',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                cursor: 'pointer',
                minWidth: '200px'
              }}
            >
              <option value="all">Tất cả khóa học</option>
              <option value="React.js Toàn Tập">React.js Toàn Tập</option>
              <option value="Node.js Backend">Node.js Backend</option>
              <option value="Python Cơ Bản">Python Cơ Bản</option>
            </select>
          </div>
        </div>

        {/* Students List */}
        <div style={{ display: 'grid', gap: '1rem' }}>
          {filteredStudents.map(student => (
            <div key={student.id} style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '1.5rem',
              alignItems: 'center'
            }}>
              {/* Avatar */}
              <div style={{
                fontSize: '3rem',
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {student.avatar}
              </div>

              {/* Info */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{student.name}</h3>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: student.progress === 100 ? '#d1fae5' : '#dbeafe',
                    color: student.progress === 100 ? '#065f46' : '#1e40af',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    {student.progress === 100 ? '✅ Hoàn thành' : '📚 Đang học'}
                  </span>
                </div>

                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                  📧 {student.email}
                </p>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '1rem',
                  marginBottom: '0.75rem'
                }}>
                  <div>
                    <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.25rem' }}>Khóa học</p>
                    <p style={{ fontWeight: '600' }}>📚 {student.totalCourses} khóa</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.25rem' }}>Bài học hoàn thành</p>
                    <p style={{ fontWeight: '600' }}>✅ {student.completedLessons} bài</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.25rem' }}>Tiến độ</p>
                    <p style={{ fontWeight: '600', color: '#667eea' }}>{student.progress}%</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.25rem' }}>Đánh giá</p>
                    <p style={{ fontWeight: '600' }}>⭐ {student.rating}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${student.progress}%`,
                    height: '100%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    transition: 'width 0.3s'
                  }}></div>
                </div>

                <p style={{ fontSize: '0.85rem', color: '#999', marginTop: '0.5rem' }}>
                  🕐 Hoạt động: {student.lastActive} | 📅 Tham gia: {student.joinDate}
                </p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button
                  onClick={() => handleViewDetails(student)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    fontWeight: '600'
                  }}
                >
                  👁️ Chi tiết
                </button>
                <button
                  onClick={() => handleSendMessage(student)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    fontWeight: '600'
                  }}
                >
                  💬 Nhắn tin
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div style={{
            background: 'white',
            padding: '3rem',
            borderRadius: '12px',
            textAlign: 'center',
            color: '#666'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <p style={{ fontSize: '1.1rem' }}>Không tìm thấy học viên nào</p>
          </div>
        )}

        {/* Student Detail Modal */}
        {selectedStudent && (
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
          onClick={handleCloseModal}
          >
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ margin: 0 }}>👤 Thông tin học viên</h2>
                <button
                  onClick={handleCloseModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: '#666'
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Student Info */}
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{
                  fontSize: '5rem',
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  {selectedStudent.avatar}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{selectedStudent.name}</h3>
                <p style={{ color: '#666' }}>{selectedStudent.email}</p>
              </div>

              {/* Enrolled Courses */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>📚 Khóa học đang tham gia</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {selectedStudent.enrolledCourses.map((course, idx) => (
                    <div key={idx} style={{
                      padding: '1rem',
                      background: '#f8f9fa',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span>📖</span>
                      <span style={{ fontWeight: '600' }}>{course}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                  <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.25rem' }}>Tổng bài học</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{selectedStudent.completedLessons}</p>
                </div>
                <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                  <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.25rem' }}>Tiến độ</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>{selectedStudent.progress}%</p>
                </div>
                <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                  <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.25rem' }}>Đánh giá</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>⭐ {selectedStudent.rating}</p>
                </div>
                <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                  <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.25rem' }}>Ngày tham gia</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{selectedStudent.joinDate}</p>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={() => handleSendMessage(selectedStudent)}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  💬 Gửi tin nhắn
                </button>
                <button
                  onClick={handleCloseModal}
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
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherStudents;