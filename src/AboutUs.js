import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">About Us</h1>
        <p className="about-subtitle">Learn more about our mission and the people behind the blog</p>
      </div>
      <div className="about-content">
        <section className="about-section">
          <h2 className="about-heading">Our Mission</h2>
          <p className="about-text">
            At BlogHub, our mission is to provide valuable insights, inspiration, and quality content on topics that matter. 
            We aim to build a platform where curious minds can explore new ideas, share knowledge, and grow together.
          </p>
        </section>
        <section className="about-section">
          <h2 className="about-heading">Meet the Team</h2>
          <p className="about-text">
            We are a passionate group of content creators, designers, and developers working together to bring you engaging 
            and informative content. From tech enthusiasts to lifestyle experts, our team is dedicated to crafting a blog 
            experience you'll love.
          </p>
        </section>
        <section className="about-section">
          <h2 className="about-heading">Why Choose Us?</h2>
          <p className="about-text">
            With a focus on authenticity and creativity, BlogHub is a hub for insightful articles, how-to guides, and stories 
            that resonate with readers. We believe in the power of words to inspire, educate, and create a lasting impact.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
