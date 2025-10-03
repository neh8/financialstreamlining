import React, { useState } from "react";

function App() {
  const [step, setStep] = useState("assessment");
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const [personalityAnswers, setPersonalityAnswers] = useState([]);
  const [personalityResult, setPersonalityResult] = useState(null);

  const questions = [
    "Why are you interested in investing right now?",
    "What would you like this app to help you with first?",
    "When do you expect to use most of the money you invest?",
    "How much time can you realistically spend learning each week?",
    "What’s your primary goal for investing?",
    "How much would you like your investments to grow in 5 years?",
    "What percentage of your income are you comfortable investing?",
    "How would you describe your investing knowledge?",
    "Have you ever invested in the stock market?",
    "How do you prefer to make investment decisions?",
  ];

  const options = ["A", "B", "C", "D"];

  const handleAnswer = (index, choice) => {
    let newAnswers = [...answers];
    newAnswers[index] = choice;
    setAnswers(newAnswers);
  };

  const submitAssessment = async () => {
    const res = await fetch("http://localhost:5000/api/investor-assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });
    const data = await res.json();
    setResult(data);
    setStep("personality");
  };

  const personalityQuestions = [
    "Weekend Fun",
    "Tech Habits",
    "Worldview",
    "Shopping Style",
    "Risk Appetite",
  ];

  const handlePersonality = (index, choice) => {
    let newAnswers = [...personalityAnswers];
    newAnswers[index] = choice;
    setPersonalityAnswers(newAnswers);
  };

  const submitPersonality = async () => {
    const res = await fetch("http://localhost:5000/api/personality-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: personalityAnswers }),
    });
    const data = await res.json();
    setPersonalityResult(data);
    setStep("results");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Financial Streamlining - Investor Assessment</h1>

      {step === "assessment" && (
        <div>
          <h2>Investor Assessment</h2>
          {questions.map((q, i) => (
            <div key={i}>
              <p>{q}</p>
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(i, opt)}
                  style={{
                    margin: "5px",
                    background: answers[i] === opt ? "lightblue" : "white",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          ))}
          <button onClick={submitAssessment}>Submit Assessment</button>
        </div>
      )}

      {step === "personality" && (
        <div>
          <h2>Personality Quiz</h2>
          {personalityQuestions.map((q, i) => (
            <div key={i}>
              <p>{q}</p>
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handlePersonality(i, opt)}
                  style={{
                    margin: "5px",
                    background: personalityAnswers[i] === opt ? "lightgreen" : "white",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          ))}
          <button onClick={submitPersonality}>Submit Personality Quiz</button>
        </div>
      )}

      {step === "results" && (
        <div>
          <h2>Results</h2>
          <p><strong>Investor Type:</strong> {result?.level}</p>
          <p><strong>Learning Path:</strong> {result?.learningPath}</p>
          <p><strong>Industry Recommendation:</strong> {personalityResult?.recommendation}</p>
        </div>
      )}
    </div>
  );
}

export default App;
