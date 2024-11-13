import React, { useState } from 'react';
import '../cssfiles/Questionaire.css'; // Import your styles

const Questionnaire = () => {
  const questions = [
    {
      questionId: '101',
      questionDescription: "What type of stocks are you interested in?",
      optionA: "Technology",
      optionB: "Healthcare",
      optionC: "Consumer Goods",
      optionD: "Real Estate",
      categoryId: '1',
      categoryName: 'Beginner',
    },
    {
      questionId: '102',
      questionDescription: "What’s your ideal stock price range?",
      optionA: "Under $100",
      optionB: "$100 - $200",
      optionC: "$200 - $300",
      optionD: "Above $300",
      categoryId: '1',
      categoryName: 'Beginner',
    },
    {
      questionId: '103',
      questionDescription: "How important is recent stock performance to you?",
      optionA: "Very important (I want stocks with positive recent performance)",
      optionB: "Somewhat important",
      optionC: "Not important (I'm focused on long-term growth)",
      optionD: "",
      categoryId: '1',
      categoryName: 'Beginner',
    },
  ];

  const [formData, setFormData] = useState({
    // Initialize formData with questionId keys to handle user answers
    101: '',
    102: '',
    103: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form>
      <div className="container">
        <h4>Questionnaire</h4>
        
        {questions.map((question) => (
          <div className="question-card" key={question.questionId}>
            <h5>{question.questionDescription}</h5>
            <div className="input-group">
              {question.optionA && (
                <div>
                  <input
                    type="radio"
                    id={`${question.questionId}-optionA`}
                    name={question.questionId}
                    value={question.optionA}
                    checked={formData[question.questionId] === question.optionA}
                    onChange={handleChange}
                  />
                  <label htmlFor={`${question.questionId}-optionA`}>{question.optionA}</label>
                </div>
              )}

              {question.optionB && (
                <div>
                  <input
                    type="radio"
                    id={`${question.questionId}-optionB`}
                    name={question.questionId}
                    value={question.optionB}
                    checked={formData[question.questionId] === question.optionB}
                    onChange={handleChange}
                  />
                  <label htmlFor={`${question.questionId}-optionB`}>{question.optionB}</label>
                </div>
              )}

              {question.optionC && (
                <div>
                  <input
                    type="radio"
                    id={`${question.questionId}-optionC`}
                    name={question.questionId}
                    value={question.optionC}
                    checked={formData[question.questionId] === question.optionC}
                    onChange={handleChange}
                  />
                  <label htmlFor={`${question.questionId}-optionC`}>{question.optionC}</label>
                </div>
              )}

              {question.optionD && (
                <div>
                  <input
                    type="radio"
                    id={`${question.questionId}-optionD`}
                    name={question.questionId}
                    value={question.optionD}
                    checked={formData[question.questionId] === question.optionD}
                    onChange={handleChange}
                  />
                  <label htmlFor={`${question.questionId}-optionD`}>{question.optionD}</label>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};

export default Questionnaire;
