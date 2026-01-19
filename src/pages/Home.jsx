import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <main id="mainContent">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-container">
          <h1>
            Học Lập Trình Online<br />
            Chất Lượng Cao
          </h1>
          <p>
            Nâng cao kỹ năng lập trình của bạn với các khóa học từ cơ bản đến nâng cao, 
            được thiết kế bởi các chuyên gia hàng đầu
          </p>
          
          <form className="search-container" onSubmit={handleSearch}>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Tìm kiếm khóa học, chủ đề..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">
              Tìm Kiếm
            </button>
          </form>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Học Viên</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Khóa Học</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Giảng Viên</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Khóa Học Nổi Bật</h2>
            <p className="section-subtitle">
              Những khóa học được đánh giá cao nhất và được nhiều học viên lựa chọn
            </p>
          </div>

          <div className="courses-grid">
            {/* Course Card 1 */}
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

            {/* Course Card 2 */}
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

            {/* Course Card 3 */}
            <div className="course-card">
              <div className="course-thumbnail">
                <div className="play-button">▶</div>
                Python Full-Stack
              </div>
              <div className="course-content">
                <div className="course-category">Full-Stack</div>
                <h3 className="course-title">Trở Thành Full-Stack Developer Với Python</h3>
                <div className="course-instructor">Giảng viên: Lê Văn C</div>
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

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => navigate('/courses')}
            >
              Xem Tất Cả Khóa Học
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Danh Mục Khóa Học</h2>
            <p className="section-subtitle">
              Chọn lĩnh vực bạn quan tâm để bắt đầu hành trình học tập
            </p>
          </div>

          <div className="categories-grid">
            <div className="category-card" onClick={() => navigate('/courses?category=web')}>
              <div className="category-icon">💻</div>
              <div className="category-name">Web Development</div>
              <div className="category-count">120+ khóa học</div>
            </div>
            <div className="category-card" onClick={() => navigate('/courses?category=mobile')}>
              <div className="category-icon">📱</div>
              <div className="category-name">Mobile App</div>
              <div className="category-count">80+ khóa học</div>
            </div>
            <div className="category-card" onClick={() => navigate('/courses?category=ai')}>
              <div className="category-icon">🤖</div>
              <div className="category-name">AI & Machine Learning</div>
              <div className="category-count">60+ khóa học</div>
            </div>
            <div className="category-card" onClick={() => navigate('/courses?category=design')}>
              <div className="category-icon">🎨</div>
              <div className="category-name">UI/UX Design</div>
              <div className="category-count">90+ khóa học</div>
            </div>
            <div className="category-card" onClick={() => navigate('/courses?category=cloud')}>
              <div className="category-icon">☁️</div>
              <div className="category-name">Cloud Computing</div>
              <div className="category-count">70+ khóa học</div>
            </div>
            <div className="category-card" onClick={() => navigate('/courses?category=security')}>
              <div className="category-icon">🔒</div>
              <div className="category-name">Cybersecurity</div>
              <div className="category-count">45+ khóa học</div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button 
              className="btn btn-secondary btn-large"
              onClick={() => navigate('/categories')}
            >
              Xem Tất Cả Danh Mục
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;