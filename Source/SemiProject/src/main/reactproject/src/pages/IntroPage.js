import React from 'react';
import '../assets/IntroPage.css';

const IntroPage = () => {
  return (
    <div className="intro-container">
      <header className="intro-header">
        <h1>Welcome to My Homepage</h1>
        <p>Your go-to platform for all things tech and innovation.</p>
      </header>
      
      <section className="about-section">
        <h2>About Us</h2>
        <p>We are a tech company focused on delivering high-quality software solutions. Our mission is to empower businesses through technology.</p>
      </section>
      
      <section className="services-section">
        <h2>Our Services</h2>
        <ul>
          <li>Web Development</li>
          <li>Mobile App Development</li>
          <li>Cloud Solutions</li>
          <li>Data Analytics</li>
        </ul>
      </section>
      
      <footer className="footer">
        <p>Contact us: info@techcompany.com</p>
      </footer>
    </div>
  );
};

export default IntroPage;
