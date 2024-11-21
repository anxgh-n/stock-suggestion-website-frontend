import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Questionnaire() {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const categoryId = sessionStorage.getItem("categoryId");
  const username = sessionStorage.getItem("username");
  const navigate = useNavigate();
  const questionUrl =
    "http://localhost:7060/questions/get-questions-by-categoryid";
  const submitUrl = "http://localhost:7060/answer/save"; //
  const updateStatusUrl = `http://localhost:7060/usercredentials/update-questionnaire-status/${username}?status=true`;
console.log(categoryId);
  useEffect(() => {
    fetch(`${questionUrl}/${categoryId}`, {
        method: 'GET', 
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        return response.json(); // Parse the response body to JSON
      })
      .then((data) => {
        console.log(data);
        const transformedQuestions = data.map((q) => ({
          ...q,
          options: [q.optionA, q.optionB, q.optionC, q.optionD].filter(Boolean),
        }));
        setQuestions(transformedQuestions);
      })
      .catch((error) =>
        console.error("There was an error fetching the questions!", error)
      );
  }, [categoryId]);

  const handleOptionClick = (questionId, option) => {
    if (formData[questionId] === option) {
      const updatedFormData = { ...formData };
      delete updatedFormData[questionId];
      setFormData(updatedFormData);
      setIsOptionSelected(false);
    } else {
      setFormData({
        ...formData,
        [questionId]: option,
      });
      setIsOptionSelected(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const nextQuestionId = questions[currentQuestionIndex + 1]?.questionId;
      setIsOptionSelected(!!formData[nextQuestionId]);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const prevQuestionId = questions[currentQuestionIndex - 1]?.questionId;
      setIsOptionSelected(!!formData[prevQuestionId]);
    }
  };

  const handleSubmit = () => {
    const answers = Object.entries(formData).map(([questionId, userAnswer]) => ({
      userAnswer,
      username,
      questionId,
    }));

    const saveAnswersPromises = answers.map((answer) =>
      fetch(submitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(answer),
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save the answer");
        }
        return response.json();
      })
    );

    Promise.all(saveAnswersPromises)
      .then(() => {
        console.log("All answers saved successfully.");
        return fetch(updateStatusUrl, {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update questionnaire status");
        }
        return response.text(); // Handle plain text response
      })
      .then((responseText) => {
        console.log(responseText); // Log "Questionnaire status updated successfully"
        sessionStorage.setItem("questionnaireStatus", "true");
        navigate("/welcome");
      })
      .catch((error) =>
        console.error(
          "There was an error submitting the questionnaire!",
          error
        )
      );
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h4 className="text-4xl font-extrabold text-indigo-900 py-9 px-20">
        Stock Questionnaire
      </h4>
      <div key={currentQuestion.questionId} className="mb-4">
        <h5 className="text-lg font-semibold text-gray-700">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h5>
        <label className="block mb-2 text-xl font-serif text-black-700">
          {currentQuestion.questionDescription}
        </label>
        <div className="flex space-x-4">
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                id={`${currentQuestion.questionId}-${index}`}
                name={currentQuestion.questionId}
                value={option}
                className="hidden"
              />
              <label
                htmlFor={`${currentQuestion.questionId}-${index}`}
                className={`block w-full text-center bg-gray-100 p-4 rounded-md hover:bg-[#d4e3f3] hover:text-black ${
                  formData[currentQuestion.questionId] === option
                    ? "bg-[#d4e3f3] text-black font-bold"
                    : ""
                }`}
                onClick={() =>
                  handleOptionClick(currentQuestion.questionId, option)
                }
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between space-x-9">
        <button
          type="button"
          className={`rounded-md border-2 border-indigo-900 px-6 py-1 font-medium transition-colors ${
            currentQuestionIndex > 0
              ? "text-indigo-900 hover:bg-indigo-900 hover:text-white"
              : "text-gray-400 cursor-not-allowed"
          }`}
          onClick={handleBack}
          disabled={currentQuestionIndex === 0}
        >
          Back
        </button>
        <button
          type="button"
          className={`rounded-md border-2 border-indigo-900 px-6 py-1 font-medium transition-colors ${
            isOptionSelected
              ? "text-indigo-900 hover:bg-indigo-900 hover:text-white"
              : "text-gray-400 cursor-not-allowed"
          }`}
          onClick={handleNext}
          disabled={!isOptionSelected}
        >
          {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
        </button>
      </div>
    </div>
  );
}
