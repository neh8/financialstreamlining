import React, { useState } from "react";
import './App.css'

function App() {
  const [step, setStep] = useState("assessment");
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const [personalityAnswers, setPersonalityAnswers] = useState([]);
  const [personalityResult, setPersonalityResult] = useState(null);

  const questions = [
    {
      questionText: "How would you describe your current investing knowledge?",
      answerOptions: [
        "I'm completely new and don't know basic terms like \"stock\" or \"bond\".",
        "I know the basics but haven't invested much.",
        "I'm comfortable with concepts like diversification and have some experience.",
        "I'm experienced and familiar with advanced topics like options or market analysis."
      ],
      answerScores: {
        "I'm completely new and don't know basic terms like \"stock\" or \"bond\".": 1,
        "I know the basics but haven't invested much.": 2,
        "I'm comfortable with concepts with diversification and have some experience.": 3,
        "I'm experienced and familiar with advanced topics like options or market analysis.": 4
      },
    },
    {
      questionText: "Have you ever invested in stocks, bonds or other securities?",
      answerOptions: [
        "No, never.",
        "Yes, but only through a retirement account like a 401(k).",
        "Yes, I've made a few individual investments.",
        "Yes, I actively manage a portfolio."
      ],
      answerScores: {
        "No, never.": 1,
        "Yes, but only through a retirement account like a 401(k).": 2,
        "Yes, I've made a few individual investments.": 3,
        "Yes, I actively manage a portfolio.": 4
      },
    },
    {
      questionText: "\What does \"diversification\" mean in investing?",
      answerOptions: [
        "Putting all your money in one stock for higher returns.",
        "Spreading investments across different assets to reduce risk.",
        "Buying only low-risk bonds.",
        "I don't know."
      ],
      answerScores: {
        "Putting all your money in one stock for higher returns.": 1,
        "Spreading investments across different assets to reduce risk.": 2,
        "Buying only low-risk bonds.": 3,
        "I don't know.": 1
      },
    },
    {
      questionText: "How familiar are you with financial ratios like P/E or Debt-to-Equity",
      answerOptions: [
        "Not at all.",
        "I've heard of them but don't understand how to use them.",
        "I can interpret them for basic stock analysis.",
        "I ues them regularly in my investment decisions."
      ],
      answerScores: {
        "Not at all.": 1,
        "I've heard of them but don't understand how to use them.": 2,
        "I can interpret them for basic stock analysis.": 3,
        "I use them regularly in my investment decisions.": 4
      },
    },
    {
      questionText: "If your investement portfolio dropped 10% in value due to market fluctuations, how would you react?",
      answerOptions: [
        "Sell immediately to avoid further losses.",
        "Monitor closely but hold if fundamentals are strong.",
        "See it as a buying opportunity and invest more.",
        "Maximize growth, accepting higher volatility."
      ],
      answerScores: {
        "Sell immediately to avoid further losses.": 1,
        "Monitor closely but hold if fundamentals are strong.": 2,
        "See it as a buying opportunity and invest more.": 3,
        "Maximize growth, accepting higher volatility.": 3
      },
    },
    {
      questionText: "Which best describes your investment goals?",
      answerOptions: [
        "Preserve capital with minimal risk, even if returns are low.",
        "Balance growth and safety with moderate returns.",
        "Maximize growth, accepting higher volatility."
      ],
      answerScores: {
        "Preserve capital with minimum risk, even if returns are low.": 1,
        "Balance growth and safety with moderate returns.": 2,
        "Maximize growth, accepting higher volatility.": 3
      },
    },
    {
      questionText: "How much volatility are you comfortable with for potential higher returns?",
      answerOptions: [
        "None; I prefer steady, predictable gains.",
        "Some, as long as it's not extreme.",
        "A lot; I'm okay with big ups and downs for big rewards."
      ],
      answerScores: {
        "None; I prefer steady, predictable gains.": 1,
        "Some, as long as it's not extreme.": 2,
        "A lot; I'm okay with big ups and downs for big rewards.": 3
      },
    },
    {
      questionText: "In a hypothetical scenario, if you had $10,000 to invest for 5 years, where would you put most of it?",
      answerOptions: [
        "Savings account or bonds for safety.",
        "A mix of stocks and bonds.",
        "Growth stocks or emerging markets."
      ],
      answerScores: {
        "Savings account or bonds for safety.": 1,
        "A mix of stocks and bonds.": 2,
        "Growth stocks or emerging markets.": 3
      },
    },
    {
      questionText: "How would you describe your understanding of how taxes affect your investments?",
      answerOptions: [
        "I don't really know how investment taxes work.",
        "I've heard of capital gains and tax-advangated accounts, but don't fully understand them.",
        "I understand key concepts like short- vs long-term capital gains and tax deferral.",
        "I actively consider tax implications (e.g., harvesting losses, asset location) when investing."
      ],
      answerScores: {
        "I don't really know how investment taxes work.": 1,
        "I've heard of capital gains and tax-advangated accounts, but don't fully understand them.": 2,
        "I understand key concepts like short- vs long-term capital gains and tax deferral.": 3,
        "I actively consider tax implications (e.g., harvesting losses, asset location) when investing.": 4
      },
    },
  ];

  const personalityoptionstest = ["A", "B", "C", "D"];

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

  const testScoreCalculation = (answers) => {
    let score = 0
    let level = ""
    let learningPath = ""
    answers.forEach((answer, index) => {
      const question = questions[index]
      if (question && answer in question.answerScores) {
        score += question.answerScores[answer]
      }
    });
    if (score >= 8 && score <= 15) {
      level = "Beginner";
      learningPath = "Basics Track: What is investing?, stocks/bonds/ETFs, starter portfolio, emotional control.";
    } else if (score >= 15 && score <= 21) {
      level = "Intermediate";
      learningPath = "Growth Track: diversification, risk-return tradeoffs, valuation basics, comparing stocks/ETFs, common financial ratios.";
    } else if (score >= 21 && score <= 25) {
      level = "Advanced";
      learningPath = "Analytics Track: portfolio optimization, valuation models, advanced risk management, options, active trader strategies.";
    } else {
      level = "Unclassified";
      learningPath = "Please retake the quiz to get a clearer result.";
    }
    const testytest = document.createElement('div')
    testytest.id = "thisisatest"
    testytest.innerHTML = `
    <div class=results>
      <p>Your score for this section is ${score}, your investor level is ${level}, and your recommended learning path is ${learningPath}</p>
    </div>
    `
    document.body.appendChild(testytest)
    return score;
  }

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
            <div key={i} className="question-container">
              <p className="question-text">{q.questionText}</p>
              <div className="answer-options">
                {q.answerOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(i, opt)}
                    className={`question-button ${answers[i] === opt ? "selected" : ""}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button onClick={() => testScoreCalculation(answers)}>Submit Assessment</button>
        </div>
      )
      }

      {
        step === "personality" && (
          <div>
            <h2>Personality Quiz</h2>
            {personalityQuestions.map((q, i) => (
              <div key={i}>
                <p>{q}</p>
                {personalityoptionstest.map((opt) => (
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
        )
      }

      {
        step === "results" && (
          <div>
            <h2>Results</h2>
            <p><strong>Investor Type:</strong> {result?.level}</p>
            <p><strong>Learning Path:</strong> {result?.learningPath}</p>
            <p><strong>Industry Recommendation:</strong> {personalityResult?.recommendation}</p>
          </div>
        )
      }
    </div >
  );
}

export default App;
