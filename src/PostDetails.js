import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Comments.css'
import CommentsSection from './CommentsSection'; 

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const getPostData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:3080/blog/viewone/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data: { bd, message, success } } = response;

      if (!token) {
        navigate('/login');
      } else if (success === false) {
        alert(message);
      } else {
        setPost(bd); // Set the post data
      }
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  };

  useEffect(() => {
    getPostData(); // Fetch post details when component loads
  }, []);

  // Render loading state if post is not loaded
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
  <h2>{post.title}</h2>
  <div className="image-container">
    <img src={post.imgUrl} alt={post.title} className="img-fluid mb-4 post-image" />
  </div>
  <p>{post.content}</p>


      {/* Back to home link */}
      <Link to="/home" className="btn btn-outline-light mb-4">
        Back to Home
      </Link>

      {/* Comments section for the post */}
      <CommentsSection postId={id} />
    </div>
  );
}

export default PostDetails;
