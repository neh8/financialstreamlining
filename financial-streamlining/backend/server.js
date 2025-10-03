const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Scoring system
const scoreMap = { A: 1, B: 2, C: 3, D: 4 };

// -----------------------------
// Investor Assessment Function
// -----------------------------
function calculateInvestorLevel(answers) {
  let totalScore = 0;
  answers.forEach(ans => {
    totalScore += scoreMap[ans] || 0;
  });

  let level = "";
  let learningPath = "";

  if (totalScore >= 12 && totalScore <= 20) {
    level = "Beginner";
    learningPath = "Basics Track: What is investing?, stocks/bonds/ETFs, starter portfolio, emotional control.";
  } else if (totalScore >= 21 && totalScore <= 32) {
    level = "Intermediate";
    learningPath = "Growth Track: diversification, risk-return tradeoffs, valuation basics, comparing stocks/ETFs, common financial ratios.";
  } else if (totalScore >= 33 && totalScore <= 48) {
    level = "Advanced";
    learningPath = "Analytics Track: portfolio optimization, valuation models, advanced risk management, options, active trader strategies.";
  } else {
    level = "Unclassified";
    learningPath = "Please retake the quiz to get a clearer result.";
  }

  return { totalScore, level, learningPath };
}

// -----------------------------
// Personality Quiz Function
// -----------------------------
function personalityQuiz(answers) {
  let counts = { A: 0, B: 0, C: 0, D: 0 };

  answers.forEach(ans => {
    if (counts[ans] !== undefined) counts[ans]++;
  });

  let topChoice = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

  let recommendation = "";
  switch (topChoice) {
    case "A":
      recommendation = "Tech & Innovation (Apple, Nvidia, Netflix, Microsoft, Tesla)";
      break;
    case "B":
      recommendation = "Travel, Environment & Lifestyle (Airbnb, Disney, Delta, NextEra Energy, EV companies)";
      break;
    case "C":
      recommendation = "Healthcare & Stability (Johnson & Johnson, Pfizer, UnitedHealth, Consumer Staples)";
      break;
    case "D":
      recommendation = "Consumer Goods & Entertainment (Nike, Amazon, Spotify, Target, Coca-Cola)";
      break;
    default:
      recommendation = "No clear match — explore multiple industries!";
  }

  return { topChoice, recommendation };
}

// -----------------------------
// API Endpoints
// -----------------------------
app.post("/api/investor-assessment", (req, res) => {
  const { answers } = req.body;
  const result = calculateInvestorLevel(answers);
  res.json(result);
});

app.post("/api/personality-quiz", (req, res) => {
  const { answers } = req.body;
  const result = personalityQuiz(answers);
  res.json(result);
});

// -----------------------------
// Server Start
// -----------------------------
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
