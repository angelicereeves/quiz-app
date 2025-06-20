import React from 'react';
import './Results.css'; // Import CSS styles for Results component

// Props: formData (for user's name), isCorrect (boolean), correctAnswer (string), onRestart (callback)
function Results({ formData, isCorrect, correctAnswer, onRestart }) {
  return (
    <div>
      {/* Personalized result message */}
      <h2>
        {isCorrect
          ? `Great job, ${formData.name}! You got it right!`
          : `Sorry, ${formData.name}. That answer is incorrect.`} {/* Use template literals for dynamic content */}
      </h2>

      {/* Show correct answer if the user was wrong */}
      {!isCorrect && (
        <p>
          The correct answer was:{" "}
          <strong dangerouslySetInnerHTML={{ __html: correctAnswer }} /> {/* Use dangerouslySetInnerHTML to render HTML entities, shows we trust the string */}
        </p>
      )}

      <div className="button-wrapper">
        <button onClick={onRestart}>Try Another Question</button> {/* Button to restart the quiz */}
    </div>

    </div>
  );
}

export default Results; // Export the Results component for use in other parts of the app
