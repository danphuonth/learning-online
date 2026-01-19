// src/pages/TeacherSchedule.jsx
import React, { useState, useEffect } from 'react';

function TeacherSchedule({ user }) {
  const [schedule, setSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('week'); // 'week' or 'month'
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    course: '',
    date: '',
    startTime: '',
    endTime: '',
    type: 'class',
    description: ''
  });

  useEffect(() => {
    // Mock data - Thay bằng Firebase query
    const today = new Date();
    const getDate = (daysOffset) => {
      const date = new Date(today);
      date.setDate(date.getDate() + daysOffset);
      return date.toISOString().split('T')[0];
    };

    setSchedule([
      {
        id: 1,
        title: 'Buổi học React.js - Component Lifecycle',
        course: 'React.js Toàn Tập',
        date: getDate(0),
        startTime: '09:00',
        endTime: '11:00',
        type: 'class',
        students: 25,
        status: 'upcoming',
        link: 'https://meet.google.com/abc-defg-hij'
      },
      {
        id: 2,
        title: 'Hỏi đáp & Review Code',
        course: 'Node.js Backend',
        date: getDate(0),
        startTime: '14:00',
        endTime: '15:30',
        type: 'qa',
        students: 18,
        status: 'upcoming',
        link: 'https://meet.google.com/xyz-uvwx-yzm'
      },
      {
        id: 3,
        title: 'Workshop: Advanced Hooks',
        course: 'React.js Toàn Tập',
        date: getDate(1),
        startTime: '10:00',
        endTime: '12:00',
        type: 'workshop',
        students: 30,
        status: 'upcoming',
        link: 'https://meet.google.com/wks-hop1-234'
      },
      {
        id: 4,
        title: 'Chấm bài tập tuần 5',
        course: 'Python Cơ Bản',
        date: getDate(2),
        startTime: '09:00',
        endTime: '10:00',
        type: 'grading',
        students: 0,
        status: 'pending'
      },
      {
        id: 5,
        title: 'Buổi học Node.js - REST API',
        course: 'Node.js Backend',
        date: getDate(2),
        startTime: '14:00',
        endTime: '16:00',
        type: 'class',
        students: 22,
        status: 'upcoming',
        link: 'https://meet.google.com/node-api-567'
      },
      {
        id: 6,
        title: 'Meeting với team giảng viên',
        course: '',
        date: getDate(3),
        startTime: '15:00',
        endTime: '16:00',
        type: 'meeting',
        students: 0,
        status: 'upcoming',
        link: 'https://meet.google.com/team-mtg-890'
      },
      {
        id: 7,
        title: 'Buổi học Python - OOP',
        course: 'Python Cơ Bản',
        date: getDate(4),
        startTime: '09:00',
        endTime: '11:00',
        type: 'class',
        students: 28,
        status: 'upcoming',
        link: 'https://meet.google.com/py-oop-123'
      }
    ]);
  }, []);

  const getTypeInfo = (type) => {
    const types = {
      class: { label: '📚 Buổi học', color: '#667eea', bgColor: '#e0e7ff' },
      qa: { label: '❓ Hỏi đáp', color: '#f59e0b', bgColor: '#fef3c7' },
      workshop: { label: '🛠️ Workshop', color: '#10b981', bgColor: '#d1fae5' },
      grading: { label: '📝 Chấm bài', color: '#8b5cf6', bgColor: '#ede9fe' },
      meeting: { label: '👥 Meeting', color: '#ef4444', bgColor: '#fee2e2' }
    };
    return types[type] || types.class;
  };

  const getDaysInWeek = () => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return schedule.filter(event => event.date === dateStr)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    // TODO: Save to Firebase
    alert('Sự kiện đã được thêm vào lịch!');
    setShowAddModal(false);
    setNewEvent({
      title: '',
      course: '',
      date: '',
      startTime: '',
      endTime: '',
      type: 'class',
      description: ''
    });
  };

  const handleJoinClass = (event) => {
    if (event.link) {
      window.open(event.link, '_blank');
    } else {
      alert('Chưa có link buổi học');
    }
  };

  const weekDays = getDaysInWeek();
  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={{ background: '#f8f9fa', minHeight: 'calc(100vh - 200px)', padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📅 Lịch dạy</h1>
            <p style={{ color: '#666' }}>Quản lý thời gian biểu và lịch giảng dạy của bạn</p>
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
            ➕ Thêm sự kiện
          </button>
        </div>

        {/* Quick Stats */}
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
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
              {schedule.filter(e => e.type === 'class').length}
            </h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Buổi học tuần này</p>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏰</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
              {getEventsForDate(new Date()).length}
            </h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Sự kiện hôm nay</p>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
              {schedule.reduce((sum, e) => sum + (e.students || 0), 0)}
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
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
              {schedule.filter(e => e.type === 'grading').length}
            </h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Bài chấm chờ</p>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(newDate.getDate() - 7);
                setSelectedDate(newDate);
              }}
              style={{
                padding: '0.5rem 1rem',
                background: '#e5e7eb',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              ◀ Tuần trước
            </button>
            
            <button
              onClick={() => setSelectedDate(new Date())}
              style={{
                padding: '0.5rem 1rem',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Hôm nay
            </button>
            
            <button
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(newDate.getDate() + 7);
                setSelectedDate(newDate);
              }}
              style={{
                padding: '0.5rem 1rem',
                background: '#e5e7eb',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Tuần sau ▶
            </button>
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>
            {weekDays[0].toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })} - {' '}
            {weekDays[6].toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </h3>
        </div>

        {/* Week View */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          {/* Week Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '1px',
            background: '#e5e7eb'
          }}>
            {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day, idx) => {
              const date = weekDays[idx];
              const dateStr = date.toISOString().split('T')[0];
              const isToday = dateStr === today;
              
              return (
                <div key={idx} style={{
                  background: isToday ? '#667eea' : 'white',
                  color: isToday ? 'white' : '#374151',
                  padding: '1rem',
                  textAlign: 'center',
                  fontWeight: '600'
                }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>{day}</div>
                  <div style={{ fontSize: '1.25rem' }}>
                    {date.getDate()}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Week Body */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '1px',
            background: '#e5e7eb',
            minHeight: '400px'
          }}>
            {weekDays.map((date, idx) => {
              const events = getEventsForDate(date);
              const dateStr = date.toISOString().split('T')[0];
              const isToday = dateStr === today;

              return (
                <div key={idx} style={{
                  background: isToday ? '#f0f4ff' : 'white',
                  padding: '0.75rem',
                  overflow: 'auto',
                  maxHeight: '500px'
                }}>
                  {events.length === 0 ? (
                    <div style={{
                      textAlign: 'center',
                      color: '#9ca3af',
                      fontSize: '0.9rem',
                      padding: '1rem'
                    }}>
                      Không có sự kiện
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {events.map(event => {
                        const typeInfo = getTypeInfo(event.type);
                        return (
                          <div
                            key={event.id}
                            style={{
                              padding: '0.75rem',
                              background: typeInfo.bgColor,
                              borderLeft: `4px solid ${typeInfo.color}`,
                              borderRadius: '6px',
                              cursor: 'pointer',
                              transition: 'transform 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                            onClick={() => event.link && handleJoinClass(event)}
                          >
                            <div style={{
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              color: typeInfo.color,
                              marginBottom: '0.25rem'
                            }}>
                              {event.startTime} - {event.endTime}
                            </div>
                            <div style={{
                              fontSize: '0.85rem',
                              fontWeight: '600',
                              marginBottom: '0.25rem',
                              color: '#374151'
                            }}>
                              {event.title}
                            </div>
                            {event.course && (
                              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                📚 {event.course}
                              </div>
                            )}
                            {event.students > 0 && (
                              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                                👥 {event.students} học viên
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Event Modal */}
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
              <h2 style={{ marginBottom: '1.5rem' }}>➕ Thêm sự kiện mới</h2>

              <form onSubmit={handleAddEvent}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Tiêu đề *
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    placeholder="VD: Buổi học React Hooks"
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
                    Loại sự kiện *
                  </label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
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
                    <option value="class">📚 Buổi học</option>
                    <option value="qa">❓ Hỏi đáp</option>
                    <option value="workshop">🛠️ Workshop</option>
                    <option value="grading">📝 Chấm bài</option>
                    <option value="meeting">👥 Meeting</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Khóa học
                  </label>
                  <select
                    value={newEvent.course}
                    onChange={(e) => setNewEvent({...newEvent, course: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="">Chọn khóa học (nếu có)</option>
                    <option value="React.js Toàn Tập">React.js Toàn Tập</option>
                    <option value="Node.js Backend">Node.js Backend</option>
                    <option value="Python Cơ Bản">Python Cơ Bản</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Ngày *
                  </label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Giờ bắt đầu *
                    </label>
                    <input
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
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

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Giờ kết thúc *
                    </label>
                    <input
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
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

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Mô tả
                  </label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    placeholder="Thêm ghi chú hoặc mô tả..."
                    rows="3"
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

                <div style={{ display: 'flex', gap: '1rem' }}>
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
                    Thêm sự kiện
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

export default TeacherSchedule;