import React, { useState } from 'react';
import HomePage from './components/HomePage'; // Import HomePage component
import QuestionForm from './components/QuestionForm'; // Import QuestionForm component
import Results from './components/Results'; // Import Results component
import './App.css'; // Import CSS styles

function App() {
  // Store form input from user (name, category, difficulty)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    difficulty: ''
  });

  // App phase: 'home', 'question', or 'result'
  const [phase, setPhase] = useState('home');

  // Result tracking
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState('');

  // When user clicks start quiz
  const startQuiz = () => setPhase('question');

  // When user submits an answer
  const handleResult = (correct, answer) => {
    setIsCorrect(correct);
    setCorrectAnswer(answer);
    setPhase('result');
  };

  // When user clicks 'Try Another Question'
  const restart = () => {
    setFormData({ name: '', category: '', difficulty: '' });
    setIsCorrect(null);
    setCorrectAnswer('');
    setPhase('home');
  };

  return (
    // Main app container
    <div style={{ padding: '1rem' }}> {/* Using inline styles for padding, can be moved to CSS but I found this one line easier */ }
      {phase === 'home' && (
        <HomePage  // Render HomePage component
          formData={formData}
          setFormData={setFormData}
          onStart={startQuiz}
        />
      )}

      {phase === 'question' && (
        <QuestionForm  // Render QuestionForm component
          formData={formData}
          onResult={handleResult}
        />
      )}

      {phase === 'result' && (
        <Results  // Render Results component
          formData={formData}
          isCorrect={isCorrect}
          correctAnswer={correctAnswer}
          onRestart={restart}
        />
      )}
    </div>
  );
}

export default App;
// This is the main App component that manages the quiz flow
// It uses state to track the user's input, current phase of the quiz, and results
