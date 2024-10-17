// components/WorldNews.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const WorldNews = () => {
  const [posts, setPosts] = useState([]);
  const navigate =  useNavigate()

  const  handleClick=(x)=>{
    navigate(`/blog/${x}`)
  }

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token")
      
      const {data:{bd}} = await axios.get(`http://localhost:3080/blog/view`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      })
      setPosts(bd.slice(19, 24)); // Display the next 5 posts for World News
    } catch (error) {
      console.error('Error fetching world news', error);
    }
  };


  useEffect(() => {
   
    fetchPosts();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="text-light mb-4">World News</h2>
      <Row>
        {posts.map((post) => (
          <Col onClick={()=>{handleClick(post._id)}} md={4} key={post._id} className="mb-4">
            <Card className="bg-dark text-white">
              <Card.Img src={post.imgUrl} alt={post.title} />
              <Card.ImgOverlay>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.description}</Card.Text>
                <Card.Text>{new Date(post.timestamp).toLocaleDateString()}</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WorldNews;
