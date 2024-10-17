// components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="https://www.facebook.com/" className="text-light">Facebook</a></li>
              <li><a href="https://x.com/" className="text-light">Twitter</a></li>
              <li><a href="https://youtube.com/" className="text-light">YouTube</a></li>
              <li><a href="https://instagram.com/" className="text-light">Instagram</a></li>
            </ul>
          </Col>
          <Col md={6}>
            <h5>Popular Posts</h5>
            <p>11 of Best Laptops Evaluated Based on Budget</p>
            <p>Apple Watch Series 5 is the Best One Yet By Consumer</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
