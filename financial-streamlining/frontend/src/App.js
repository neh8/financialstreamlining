// frontend/src/App.js
import React, { useState } from "react";
import axios from "axios";
//import Results from "./Results";

function App() {
  const [step, setStep] = useState("quiz");
  const [answers, setAnswers] = useState([]);
  const [personality, setPersonality] = useState([]);
  const [result, setResult] = useState(null);

  const handleAnswer = (value) => {
    setAnswers([...answers, value]);
  };

  const handlePersonality = (value) => {
    setPersonality([...personality, value]);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/assessment", {
        answers,
        personality,
      });
      setResult(res.data);
      setStep("results");
    } catch (err) {
      console.error(err);
    }
  };

  //if (step === "results") {
    //return <Results data={result} />;
  //}

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Investor Assessment</h1>

      <p>1. Why are you interested in investing right now?</p>
      <button onClick={() => handleAnswer("A")}>A) Learn basics</button>
      <button onClick={() => handleAnswer("B")}>B) Grow savings</button>
      <button onClick={() => handleAnswer("C")}>C) Smarter decisions</button>
      <button onClick={() => handleAnswer("D")}>D) High returns</button>

      {/* Add the rest of the 12 questions in the same style */}

      <h2>Personality Quiz</h2>
      <p>What do you most enjoy doing in your free time?</p>
      <button onClick={() => handlePersonality("A")}>A) Gaming</button>
      <button onClick={() => handlePersonality("B")}>B) Traveling</button>
      <button onClick={() => handlePersonality("C")}>C) Gym/Recipes</button>
      <button onClick={() => handlePersonality("D")}>D) Shopping</button>

      <br /><br />
      <button onClick={handleSubmit}>Submit Assessment</button>
    </div>
  );
}

export default App;
