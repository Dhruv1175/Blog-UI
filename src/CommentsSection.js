import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentsSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch comments on load
  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3080/blog/getcomment/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.data.success) {
        setComments(response.data.data);
      } else {
        console.error('Error fetching comments:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleAddComment = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3080/blog/addcomment/${postId}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      if (response.data.success) {
        setContent(''); // Clear input field
        fetchComments(); // Refresh comments
      } else {
        console.error('Error adding comment:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`http://localhost:3080/blog/delcomment/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success ==true) {
        fetchComments(); // Refresh comments
      } else {
        alert('Error deleting comment:', response.data.message);
      }
    } catch (error) {
      alert('Error deleting comment:', error);
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      <div className="add-comment">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
        />
        <button
          onClick={handleAddComment}
          disabled={loading}
          className="btn btn-primary mt-2"
        >
          {loading ? 'Adding...' : 'Add Comment'}
        </button>
      </div>
      <div className="comments-list mt-4">
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="comment-item mb-2">
              <p>{comment.content}</p>
              <button
                onClick={() => handleDeleteComment(comment._id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
