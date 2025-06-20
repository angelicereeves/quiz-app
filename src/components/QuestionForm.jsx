import React, { useEffect, useState } from 'react';
import './QuestionForm.css'; // Import CSS styles

// defining the QuestionForm component
function QuestionForm({ formData, onResult }) {
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [error, setError] = useState('');
  const [apiError, setApiError] = useState('');
  const [hasFetched, setHasFetched] = useState(false); // locks fetch to only happen once

  useEffect(() => {
    // Avoid running fetch multiple times
    if (hasFetched || !formData.category || !formData.difficulty) return;

    setHasFetched(true); // Lock it right away so it doesn't run again

    const url = `https://opentdb.com/api.php?amount=1&type=multiple&category=${formData.category}&difficulty=${formData.difficulty}`;
    console.log('Fetching from:', url); //using console.log for debugging to make sure the URL is correct

    // Fetching question data from the API
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('📥 API Response:', data);
        if (!data.results || data.results.length === 0) {
          setApiError('No questions returned. Try a different category or difficulty.');
          return;
        }

        const q = data.results[0];
        const allAnswers = [...q.incorrect_answers, q.correct_answer]
          .sort(() => Math.random() - 0.5); // Shuffle answers

        setQuestionData({ ...q, all_answers: allAnswers }); // Store all answers in state
      })
      .catch((err) => { // Handle fetch errors
        console.error('Fetch error:', err);
        setApiError('There was a problem loading your question.');
      });
  }, [formData, hasFetched]); // Only run once when formData changes

  const handleSubmit = (e) => { // Handle form submission
    // Prevent default form submission behavior
    e.preventDefault();

    if (!selectedAnswer) {
      setError('Please select an answer.');
      return; // Exit if no answer is selected
    }

    setError('');
    const isCorrect = selectedAnswer === questionData.correct_answer;
    onResult(isCorrect, questionData.correct_answer); // Pass result to parent component
  };

  // Show errors or loading states
  if (apiError) return <p style={{ color: 'red' }}>{apiError}</p>;
  if (!questionData) return <p>Loading question...</p>;

  return ( // Render the question form
    <form onSubmit={handleSubmit}>
      <h2 dangerouslySetInnerHTML={{ __html: questionData.question }} /> {/* Display question with HTML entities decoded, showing we trust the string */}

        {questionData.all_answers.map((answer, index) => (
            <label key={index} className="answer-option">
                <input
                 type="radio"
                name="answer"
                value={answer}
                checked={selectedAnswer === answer}
                onChange={(e) => setSelectedAnswer(e.target.value)} // Update selected answer
                 />
                <span dangerouslySetInnerHTML={{ __html: answer }} />
            </label>
    ))}


      <br />
      <button type="submit">Submit Answer</button>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error if no answer is selected */}
    </form>
  );
}

export default QuestionForm; // export the component for use in other parts of the app
