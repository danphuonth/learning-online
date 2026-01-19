import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>LearnHub</h3>
            <p>
              Nền tảng học trực tuyến hàng đầu Việt Nam, mang đến những khóa học 
              chất lượng cao với giá thành hợp lý.
            </p>
          </div>

          <div className="footer-section">
            <h3>Khóa Học</h3>
            <ul className="footer-links">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/courses?category=web');
                  }}
                >
                  Web Development
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/courses?category=mobile');
                  }}
                >
                  Mobile App
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/courses?category=ai');
                  }}
                >
                  AI & ML
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/courses?category=design');
                  }}
                >
                  UI/UX Design
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Hỗ Trợ</h3>
            <ul className="footer-links">
              <li><a href="#">Trung tâm trợ giúp</a></li>
              <li><a href="#">Liên hệ</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Liên Hệ</h3>
            <ul className="footer-links">
              <li>📧 info@learnhub.vn</li>
              <li>📞 081 5265 027</li>
              <li>📍 Tp Hồ Chí Minh, Việt Nam</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 LearnHub. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;