import React, { useState } from 'react'; // Import React and useState hook
// not importing CSS here, styles are handled in App.css

// The HomePage component receives formData, setFormData, and onStart as props
function HomePage({ formData, setFormData, onStart }) {
  const [error, setError] = useState(''); // to show error messages

  // Handle input and dropdown changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the formData object in parent (App)
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.category || !formData.difficulty) {
            setError('All fields are required.');
        } else {
            console.log("Submitting form with:", formData); // Debug
            setError('');
            onStart(); // This should change App's phase to "question"
         }
    };


  // JSX for rendering the form
  return (
    <div>
      <h1>Quiz App</h1>
      <p>Enter your name and select a category and difficulty!</p>

      <form onSubmit={handleSubmit}>
        {/* Name input, as an object */}
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <br />

        {/* Category dropdown */}
        <label>
          Category:
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select a Category</option>
            {/* List of categories with their corresponding IDs */}
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="17">Science & Nature</option>
            <option value="20">Mythology</option> 
            <option value="23">History</option>
            <option value="27">Animals</option>
          </select>
        </label>

        <br />

        {/* Difficulty dropdown */}
        <label>
          Difficulty:
          <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
            <option value="">Select a Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <br />

        {/* Submit button */}
        <button type="submit">Start Quiz</button>
      </form>

      {/* Error message (conditionally rendered) */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default HomePage; // Export the HomePage component for use in other parts of the app
