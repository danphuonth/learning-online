import React from 'react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'web',
      icon: '💻',
      name: 'Web Development',
      description: 'Học cách xây dựng website và ứng dụng web từ cơ bản đến chuyên nghiệp',
      courses: '120+',
      students: '8,500+',
      rating: '4.7',
      topics: ['HTML & CSS', 'JavaScript', 'React.js', 'Vue.js', 'Angular', 'Node.js', 'Express.js', 'TypeScript']
    },
    {
      id: 'mobile',
      icon: '📱',
      name: 'Mobile App Development',
      description: 'Phát triển ứng dụng di động cho iOS và Android một cách chuyên nghiệp',
      courses: '80+',
      students: '5,200+',
      rating: '4.8',
      topics: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS Development', 'Android Development', 'Xamarin', 'Ionic']
    },
    {
      id: 'ai',
      icon: '🤖',
      name: 'AI & Machine Learning',
      description: 'Khám phá thế giới trí tuệ nhân tạo và học máy với các thuật toán hiện đại',
      courses: '60+',
      students: '4,800+',
      rating: '4.9',
      topics: ['Python ML', 'TensorFlow', 'PyTorch', 'Deep Learning', 'Neural Networks', 'NLP', 'Computer Vision', 'Data Science']
    },
    {
      id: 'design',
      icon: '🎨',
      name: 'UI/UX Design',
      description: 'Thiết kế giao diện và trải nghiệm người dùng chuyên nghiệp và hấp dẫn',
      courses: '90+',
      students: '6,300+',
      rating: '4.8',
      topics: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'Wireframing', 'Design Systems', 'Interaction Design']
    },
    {
      id: 'cloud',
      icon: '☁️',
      name: 'Cloud Computing',
      description: 'Làm chủ các nền tảng đám mây và kiến trúc hệ thống hiện đại',
      courses: '70+',
      students: '3,900+',
      rating: '4.7',
      topics: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'DevOps', 'CI/CD', 'Serverless']
    },
    {
      id: 'security',
      icon: '🔒',
      name: 'Cybersecurity',
      description: 'Bảo mật hệ thống và ứng dụng trong thời đại số',
      courses: '45+',
      students: '2,700+',
      rating: '4.8',
      topics: ['Ethical Hacking', 'Penetration Testing', 'Network Security', 'Web Security', 'Cryptography', 'Security Analysis', 'OWASP', 'Security Audit']
    },
    {
      id: 'backend',
      icon: '🗄️',
      name: 'Database & Backend',
      description: 'Quản lý cơ sở dữ liệu và phát triển backend mạnh mẽ',
      courses: '75+',
      students: '5,600+',
      rating: '4.7',
      topics: ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'GraphQL', 'REST API', 'Microservices']
    },
    {
      id: 'game',
      icon: '🎮',
      name: 'Game Development',
      description: 'Tạo ra những trò chơi độc đáo và hấp dẫn',
      courses: '55+',
      students: '3,400+',
      rating: '4.6',
      topics: ['Unity', 'Unreal Engine', 'C# Game Dev', 'C++ Game Dev', '2D Games', '3D Games', 'Game Design', 'Godot']
    }
  ];

  return (
    <>
      {/* PAGE HEADER */}
      <section className="page-header">
        <div className="container">
          <h1>Danh Mục Khóa Học</h1>
          <p>Khám phá các lĩnh vực học tập đa dạng và tìm con đường phù hợp với bạn</p>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section className="categories-detail-section">
        <div className="container">
          {categories.map(category => (
            <div key={category.id} className="category-detail-card">
              <div className="category-detail-header">
                <div className="category-detail-icon">{category.icon}</div>
                <div className="category-detail-info">
                  <h2>{category.name}</h2>
                  <p>{category.description}</p>
                  <div className="category-stats">
                    <span>📚 {category.courses} khóa học</span>
                    <span>👥 {category.students} học viên</span>
                    <span>⭐ {category.rating} đánh giá</span>
                  </div>
                </div>
              </div>
              <div className="category-topics">
                <h3>Chủ đề phổ biến:</h3>
                <div className="topic-tags">
                  {category.topics.map((topic, index) => (
                    <span key={index} className="topic-tag">{topic}</span>
                  ))}
                </div>
              </div>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate(`/courses?category=${category.id}`)}
              >
                Xem Tất Cả Khóa Học
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Sẵn Sàng Bắt Đầu Hành Trình Học Tập?</h2>
            <p>Tham gia cùng hàng nghìn học viên đã thay đổi sự nghiệp của họ với LearnHub</p>
            <div className="cta-buttons">
              <button 
                className="btn btn-primary btn-large" 
                onClick={() => navigate('/courses')}
              >
                Khám Phá Khóa Học
              </button>
              <button className="btn btn-secondary btn-large">
                Đăng Ký Miễn Phí
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;