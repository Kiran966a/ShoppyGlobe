import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css'; 
const About = () => {
  const navigate = useNavigate();
  return (
    <div className="about-page">
      <button className="back-button" onClick={() => navigate(-1)}>Back</button> 
      <section className="hero-section">
        <h1>About ShoppyGlobe</h1>
        <p>Your go-to destination for a world of shopping.</p>
      </section>
      <section className="content">
        <div className="content-block">
          <h2>Our Mission</h2>
          <p>
            At ShoppyGlobe, our mission is to offer a diverse range of high-quality products 
            and provide an exceptional shopping experience. We are committed to curating 
            the best selection of items to meet your needs and exceed your expectations.
          </p>
        </div>
        <div className="content-block">
          <h2>Our Values</h2>
          <p>
            Integrity, quality, and customer satisfaction are at the core of what we do. 
            We strive to build trust with our customers through transparency and a commitment 
            to delivering the best products and services.
          </p>
        </div>
        <div className="content-block">
          <h2>Our Story</h2>
          <p>
            Founded with a passion for shopping and technology, ShoppyGlobe began as a small 
            project with a big vision. Over the years, we've grown into a leading online retailer 
            with a dedicated team and a loyal customer base. Join us on our journey and experience 
            the future of shopping.
          </p>
        </div>
      </section>
      <footer>
        <p>&copy; {new Date().getFullYear()} ShoppyGlobe. All rights reserved.Kiran Solanki</p>
      </footer>
    </div>
  );
};
export default About;
