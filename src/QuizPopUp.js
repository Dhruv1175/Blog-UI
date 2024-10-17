import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const QuizPopup = () => {
  const [show, setShow] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    // Function to randomly show the quiz popup
    const showQuizRandomly = () => {
      setTimeout(() => {
        setShow(true);
        fetchQuiz(); // Fetch the quiz when it's time to show the modal
      }, Math.random() * 30000); // Randomly triggers after 0-30 seconds
    };

    // First quiz popup
    showQuizRandomly();

    // Set up interval to show quiz popup every 10-15 minutes after the first appearance
    const interval = setInterval(() => {
      showQuizRandomly();
    }, Math.random() * 300000 + 600000); // Random intervals between 10-15 minutes

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const fetchQuiz = async () => {
    try {
      const token = localStorage.getItem("token");

      // Fetch quiz data from the API
      const { data } = await axios.get(`http://localhost:3080/blog/viewquiz`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      console.log('Fetched Quiz Data:', data); // Log the response for debugging

      // Explicitly check if the data contains the question and options
      if (data && data.question && data.options) {
        setQuizData(data); // Set quiz data only if it's valid
      } else {
        console.error('Quiz data is missing required fields:', data);
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setFeedback(""); // Clear feedback on new selection
  };

  const verifyAnswer = () => {
    if (selectedOption && quizData) {
      const normalizedSelectedOption = selectedOption.trim().toLowerCase();
      const normalizedAnswer = quizData.answer.trim().toLowerCase();
      
      if (normalizedSelectedOption === normalizedAnswer) {
        setFeedback("Correct Answer!");
      } else {
        setFeedback("Wrong Answer!");
      }
    }
  };

  const handleClose = () => {
    setShow(false);
    setSelectedOption(null);  // Reset on close
    setFeedback("");          // Clear feedback on close
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{color:"black"}}>Quiz Time!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {quizData ? (
          <>
            <p style={{fontSize:18}}>{quizData.question || 'No question available!'}</p> {/* If question is missing, show a fallback message */}
            <div>
              {quizData.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedOption === option ? "primary" : "secondary"}
                  onClick={() => handleOptionSelect(option)}
                  className="m-2"
                >
                  {option}
                </Button>
              ))}
            </div>
            {feedback && <p>{feedback}</p>}
          </>
        ) : (
          <p>Loading quiz...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={verifyAnswer} disabled={!selectedOption}>
          Submit Answer
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuizPopup;
