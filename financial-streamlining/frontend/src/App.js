import React, { useState } from "react";
import './App.css'

function App() {
  const [step, setStep] = useState("begin");
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      questionText: "How would you describe your current investing knowledge?",
      answerOptions: [
        { answerText: "I'm completely new and don't know basic terms like \"stock\" or \"bond\".", score: 1 },
        { answerText: "I know the basics but haven't invested much.", score: 2 },
        { answerText: "I'm comfortable with concepts like diversification and have some experience.", score: 3 },
        { answerText: "I'm experienced and familiar with advanced topics like options or market analysis.", score: 4 }
      ],
    },
    {
      questionText: "Have you ever invested in stocks, bonds or other securities?",
      answerOptions: [
        { answerText: "No, never.", score: 1 },
        { answerText: "Yes, but only through a retirement account like a 401(k).", score: 2 },
        { answerText: "Yes, I've made a few individual investments.", score: 3 },
        { answerText: "Yes, I actively manage a portfolio.", score: 4 }
      ],
    },
    {
      questionText: "What does \"diversification\" mean in investing?",
      answerOptions: [
        { answerText: "Putting all your money in one stock for higher returns.", score: 3 },
        { answerText: "Spreading investments across different assets to reduce risk.", score: 4 },
        { answerText: "Buying only low-risk bonds.", score: 2 },
        { answerText: "I don't know.", score: 1 }
      ],
    },
    {
      questionText: "How familiar are you with financial ratios like P/E or Debt-to-Equity",
      answerOptions: [
        { answerText: "Not at all.", score: 1 },
        { answerText: "I've heard of them but don't understand how to use them.", score: 2 },
        { answerText: "I can interpret them for basic stock analysis.", score: 3 },
        { answerText: "I use them regularly in my investment decisions.", score: 4 }
      ],
    },
    {
      questionText: "If your investement portfolio dropped 10% in value due to market fluctuations, how would you react?",
      answerOptions: [
        { answerText: "Sell immediately to avoid further losses.", score: 1 },
        { answerText: "Monitor closely but hold if fundamentals are strong.", score: 2 },
        { answerText: "See it as a buying opportunity and invest more.", score: 3 },
        { answerText: "Maximize growth, accepting higher volatility.", score: 4 }
      ],
    },
    {
      questionText: "Which best describes your investment goals?",
      answerOptions: [
        { answerText: "Preserve capital with minimal risk, even if returns are low.", score: 1 },
        { answerText: "Balance growth and safety with moderate returns.", score: 2 },
        { answerText: "Maximize growth, accepting higher volatility.", score: 3 }
      ],
    },
    {
      questionText: "How much volatility are you comfortable with for potential higher returns?",
      answerOptions: [
        { answerText: "None; I prefer steady, predictable gains.", score: 1 },
        { answerText: "Some, as long as it's not extreme.", score: 2 },
        { answerText: "A lot; I'm okay with big ups and downs for big rewards.", score: 3 }
      ],
    },
    {
      questionText: "In a hypothetical scenario, if you had $10,000 to invest for 5 years, where would you put most of it?",
      answerOptions: [
        { answerText: "Savings account or bonds for safety.", score: 1 },
        { answerText: "A mix of stocks and bonds.", score: 2 },
        { answerText: "Growth stocks or emerging markets.", score: 3 }
      ],
    },
    {
      questionText: "How would you describe your understanding of how taxes affect your investments?",
      answerOptions: [
        { answerText: "I don't really know how investment taxes work.", score: 1 },
        { answerText: "I've heard of capital gains and tax-advangated accounts, but don't fully understand them.", score: 2 },
        { answerText: "I understand key concepts like short- vs long-term capital gains and tax deferral.", score: 3 },
        { answerText: "I actively consider tax implications (e.g., harvesting losses, asset location) when investing.", score: 4 }
      ],
    },
  ];

  const handleAnswer = (index, choice) => {
    let newAnswers = [...answers];
    newAnswers[index] = choice.answerText;
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      document.getElementById("next-question-button").style.display = "block"
    }
    else {
      document.getElementById("submit-assesment").style.display = "block";
    }
  };


  const testScoreCalculation = (answers) => {
    let score = 0;
    let level = "";
    let learningPath = "";

    answers.forEach((answerText, index) => {
      if (!answerText) return;

      const question = questions[index];
      const selectedAnswer = question.answerOptions.find(
        (opt) => opt.answerText === answerText
      );

      if (selectedAnswer && selectedAnswer.score) {
        score += selectedAnswer.score;
      }
    });

    if (score >= 8 && score <= 15) {
      level = "Beginner";
      learningPath =
        "Basics Track: What is investing?, stocks/bonds/ETFs, starter portfolio, emotional control.";
    } else if (score >= 15 && score <= 21) {
      level = "Intermediate";
      learningPath =
        "Growth Track: diversification, risk-return tradeoffs, valuation basics, comparing stocks/ETFs, common financial ratios.";
    } else if (score >= 21) {
      level = "Advanced";
      learningPath =
        "Analytics Track: portfolio optimization, valuation models, advanced risk management, options, active trader strategies.";
    } else {
      level = "Unclassified";
      learningPath = "Please retake the quiz to get a clearer result.";
    }
    /*const testytest = document.createElement('div')
    testytest.id = "thisisatest"
    testytest.innerHTML = `
    <div className=results>
      <p>Your score for this section is ${score}, your investor level is ${level}, and your recommended learning path is ${learningPath}</p>
    </div>
    `
    document.body.appendChild(testytest)*/
    setStep("results")
    setResult({ "score": score, "level": level, "learningPath": learningPath });
  }

  const nextQuestion = (currentQuestion) => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      document.getElementById("next-question-button").style.display = "none";
    }
    else {
      document.getElementById("submit-assesment").style.display = "block";
      document.getElementById("next-question-button").style.display = "none";
    }
  }

  return (
    <>
      <header>
        <h1>Financial Streamlining - Investor Assessment</h1>
        <h2>Investor Assessment</h2>
      </header>

      <div>
        {step === "begin" && (
          <div className="container">
            <h2>Welcome to the financial-knowledge assesment! Please click the button to begin.</h2>
            <button id="start" onClick={() => setStep("assessment")}>Begin Assesment</button>
          </div>
        )}

        {step === "assessment" && (
          <div className="container">
            <div className="question-container">
              <p className="question-text">{questions[currentQuestion].questionText}</p>
              <div className="answer-options">
                {questions[currentQuestion].answerOptions.map((opt) => (
                  <button
                    key={opt.answerText}
                    onClick={() => handleAnswer(currentQuestion, opt)}
                    className={`question-button ${answers[currentQuestion] === opt.answerText ? "selected" : ""}`}
                    disabled={answers[currentQuestion] && answers[currentQuestion] !== opt.answerText}
                  >
                    {opt.answerText}
                  </button>
                ))}
                <button id="next-question-button" onClick={() => nextQuestion(currentQuestion)}>Next Question</button>
              </div>
            </div>
            <button id="submit-assesment" onClick={() => testScoreCalculation(answers)}>Submit Assessment</button>
          </div>
        )
        }


        {
          step === "results" && (
            <div className="container">
              <h2>Results</h2>
              <p><strong>Score:</strong> {result?.score}</p>
              <p><strong>Investor Type:</strong> {result?.level}</p>
              <p><strong>Learning Path:</strong> {result?.learningPath}</p>
            </div>
          )
        }
      </div>
    </>
  );
}

export default App;
