// src/pages/Courses.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Courses = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  useEffect(() => {
    // Lấy params từ URL
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    
    if (search) setSearchQuery(search);
    if (category) setSelectedCategory(category);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search:', searchQuery);
  };

  return (
    <>
      {/* PAGE HEADER */}
      <section className="page-header">
        <div className="container">
          <h1>Tất Cả Khóa Học</h1>
          <p>Khám phá hơn 500+ khóa học lập trình chất lượng cao</p>
        </div>
      </section>

      {/* FILTERS & SEARCH */}
      <section className="courses-filter-section">
        <div className="container">
          <div className="filter-bar">
            <div className="search-box">
              <input 
                type="text" 
                placeholder="Tìm kiếm khóa học..." 
                className="filter-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-btn" onClick={handleSearch}>🔍</button>
            </div>
            
            <div className="filter-group">
              <select 
                className="filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Tất cả danh mục</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="fullstack">Full-Stack</option>
                <option value="mobile">Mobile</option>
                <option value="ai">AI & ML</option>
                <option value="design">UI/UX Design</option>
              </select>
              
              <select 
                className="filter-select"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="">Mức độ</option>
                <option value="beginner">Cơ bản</option>
                <option value="intermediate">Trung cấp</option>
                <option value="advanced">Nâng cao</option>
              </select>
              
              <select className="filter-select">
                <option value="">Giá</option>
                <option value="free">Miễn phí</option>
                <option value="paid">Có phí</option>
                <option value="premium">Premium</option>
              </select>
              
              <select className="filter-select">
                <option value="popular">Phổ biến nhất</option>
                <option value="newest">Mới nhất</option>
                <option value="rating">Đánh giá cao</option>
                <option value="price-low">Giá thấp</option>
                <option value="price-high">Giá cao</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* COURSES LIST */}
      <section className="courses-list-section">
        <div className="container">
          <div className="courses-grid">
            {/* Course 1 */}
            <div className="course-card">
              <div className="course-thumbnail">
                <div className="play-button">▶</div>
                <div className="premium-badge">PREMIUM</div>
                React.js Toàn Tập
              </div>
              <div className="course-content">
                <div className="course-category">Frontend</div>
                <h3 className="course-title">Xây Dựng Ứng Dụng Web Hiện Đại Với React.js</h3>
                <div className="course-instructor">Giảng viên: Nguyễn Văn A</div>
                <div className="course-stats">
                  <span>📚 45 bài học</span>
                  <span>⏱️ 12 giờ</span>
                  <span>👥 2,345 học viên</span>
                </div>
                <div className="course-meta">
                  <div className="course-rating">⭐ 4.8 (1,234)</div>
                  <div className="course-price">
                    1,299,000đ
                    <span className="old-price">1,999,000đ</span>
                  </div>
                </div>
                <div className="course-actions">
                  <button className="btn-course btn-preview">Xem Trước</button>
                  <button className="btn-course btn-enroll">Đăng Ký Học</button>
                </div>
              </div>
            </div>

            {/* Course 2 */}
            <div className="course-card">
              <div className="course-thumbnail">
                <div className="play-button">▶</div>
                <div className="premium-badge">PREMIUM</div>
                Node.js Backend
              </div>
              <div className="course-content">
                <div className="course-category">Backend</div>
                <h3 className="course-title">Lập Trình Backend Chuyên Nghiệp Với Node.js</h3>
                <div className="course-instructor">Giảng viên: Trần Thị B</div>
                <div className="course-stats">
                  <span>📚 52 bài học</span>
                  <span>⏱️ 15 giờ</span>
                  <span>👥 1,876 học viên</span>
                </div>
                <div className="course-meta">
                  <div className="course-rating">⭐ 4.9 (987)</div>
                  <div className="course-price">
                    1,599,000đ
                    <span className="old-price">2,299,000đ</span>
                  </div>
                </div>
                <div className="course-actions">
                  <button className="btn-course btn-preview">Xem Trước</button>
                  <button className="btn-course btn-enroll">Đăng Ký Học</button>
                </div>
              </div>
            </div>

            {/* Course 3 */}
            <div className="course-card">
              <div className="course-thumbnail">
                <div className="play-button">▶</div>
                Python Full-Stack
              </div>
              <div className="course-content">
                <div className="course-category">Full-Stack</div>
                <h3 className="course-title">Trở Thành Full-Stack Developer Với Python</h3>
                <div className="course-instructor">Giảng viên: Lê Văn C</div>
                <div className="course-stats">
                  <span>📚 60 bài học</span>
                  <span>⏱️ 18 giờ</span>
                  <span>👥 3,567 học viên</span>
                </div>
                <div className="course-meta">
                  <div className="course-rating">⭐ 4.7 (2,156)</div>
                  <div className="course-price">Miễn Phí</div>
                </div>
                <div className="course-actions">
                  <button className="btn-course btn-preview">Xem Trước</button>
                  <button className="btn-course btn-enroll">Học Ngay</button>
                </div>
              </div>
            </div>
          </div>

          {/* PAGINATION */}
          <div className="pagination">
            <button className="pagination-btn" disabled>← Trước</button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <button className="pagination-btn">4</button>
            <button className="pagination-btn">5</button>
            <button className="pagination-btn">Sau →</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Courses;