import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Questionaire() {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({});
  const categoryId = "2";
  const username = "anjali"; 
  let navigate = useNavigate();
  const questionUrl =
    "http://localhost:7064/questions/get-questions-by-categoryid";
  
    const submitUrl = "http://localhost:7065/answer/save";

  useEffect(() => {
    fetch(`${questionUrl}/${categoryId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Questions:", data);
        const transformedQuestions = data.map((q) => ({
          ...q,
          options: [q.optionA, q.optionB, q.optionC, q.optionD].filter(Boolean), // Transform and filter options
        }));
        setQuestions(transformedQuestions);
      })
      .catch((error) =>
        console.error("There was an error fetching the questions!", error)
      );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleReset = () => {
    setFormData({}); // Reset formData to an empty object
  };

  const handleSubmit = () => {
    // Convert formData to the required format
    const answers = Object.entries(formData).map(([questionId, userAnswer]) => ({
      userAnswer,
      username,
      questionId,
    }));

    // Send each answer to the server
    answers.forEach((answer) => {
      fetch(submitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answer),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to save the answer");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Answer saved:", data);
          navigate("/welcome");
          
        })
        .catch((error) =>
          console.error("There was an error saving the answer!", error)
        );
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h4 className="text-4xl font-extrabold text-indigo-900 py-9 px-20">
        Stock Questionnaire
      </h4>
      {questions.map((question) => (
        <div key={question.questionId} className="mb-4">
          <label className="block mb-2 text-xl font-serif text-black-700">
            {question.questionDescription}
          </label>
          <div className="flex space-x-4">
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`${question.questionId}-${index}`}
                  name={question.questionId}
                  value={option}
                  className="hidden"
                  checked={formData[question.questionId] === option} // Controlled by formData
                  onChange={handleChange} // Updates formData when clicked
                />
                <label
                  htmlFor={`${question.questionId}-${index}`}
                  className={`block w-full text-center bg-gray-100 p-4 rounded-md hover:bg-[#305072] hover:text-white ${
                    formData[question.questionId] === option
                      ? "bg-[#305072] text-white"
                      : ""
                  }`}
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex space-x-9">
        <button
          type="submit"
          className="rounded-md border-2 border-indigo-900 px-6 py-1 font-medium text-indigo-900 transition-colors hover:bg-indigo-900 hover:text-white"
          onClick={handleSubmit} 
        >
          Submit
        </button>
        <button
          type="button" // Prevents form submission
          onClick={handleReset} // Calls the reset handler
          className="rounded-md border-2 border-indigo-900 px-6 py-1 font-medium text-indigo-900 transition-colors hover:bg-indigo-900 hover:text-white"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
