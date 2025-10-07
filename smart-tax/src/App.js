import { useState } from "react";
import './App.css';

function App() {
  const [userIncome, setUserIncome] = useState(0);

  const setIncome = () => {
    const value = document.getElementById("income-entry").value
    if (isNaN(Number(value))) {
      let error = document.createElement("div")
      error.className = "error-msg"
      error.innerHTML = `<p>Error: income must be a number</p>`
      document.getElementById("income").appendChild(error)
    }
    else {
      setUserIncome(Number(value));
    }
  }

  const updateIncome = () => {
    const value = document.getElementById("income-modify").value
    if (isNaN(Number(value))) {
      let error = document.createElement("div")
      error.className = "error-msg"
      error.innerHTML = `<p>Error: income must be a number</p>`
      document.getElementById("income").appendChild(error)
    }
    else {
      setUserIncome(Number(value));
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Smart Tax Planner (version 0.1.0)</h1>
      </header>
      <div className="feature" id="income">
        <div className="value-entry-container">
          <p>Please enter your income.</p>
          <input type="text" id="income-entry"></input>
          <button className="submit" onClick={setIncome}>Submit</button>
        </div>
        <div className="value-entry-container">
          <p>You may update your income here:</p>
          <input type="text" id="income-modify"></input>
          <button className="submit" onClick={updateIncome}>Submit</button>
        </div>
        <h3>Your income is ${userIncome}</h3>
        <p>Coming soon: users enter multiple income sources, system aggregates income</p>
      </div>
      <div className="feature" id="investment-tracker">
        <h2>Coming Soon: Investment Entry Tracking</h2>
        <p>User logs investments, system creates tax lot and begins holding period, system confirms whether asset will become long-term and when</p>
      </div>
      <div className="feature" id="realtime-bracket">
        <h2>Coming Soon: Real-Time Bracket Identification</h2>
        <p>Identifies user's current tax bracket</p>
      </div>
      <div className="feature" id="bracket-shift">
        <h2>Coming Soon: Bracket Shift Simulation</h2>
        <p>Software notifies potential bracket change based on user activity</p>
      </div>
      <div className="feature" id="modeling">
        <h2>Coming Soon: Scenario Modeling</h2>
        <p>User can run simulations TODO: Ask for clarification</p>
      </div>
      <div className="feature" id="capital-gains">
        <h2>Coming Soon: Capital Gains Optimization</h2>
        <p>Classifies short and long-term gains, calculating tax for each class</p>
      </div>
      <div className="feature" id="harvesting-alerts">
        <h2>Coming Soon: Harvesting Alerts</h2>
        <p>Notifies when a loss can be harvested to offset gains</p>
      </div>
      <div className="feature" id="asset-guidance">
        <h2>Coming Soon: Asset Location Guidance</h2>
        <p>Software recommends which accounts to hold investments in</p>
      </div>
      <div className="feature" id="ctax-impact">
        <h2>Coming Soon: Tax Impact Estimations</h2>
        <p>Software shows estimated tax liability based on user's current financial position</p>
      </div>
      <div className="feature" id="eoy-tax-summary">
        <h2>Coming Soon: End-of-Year Tax Summary</h2>
        <p>Software ceates a report/visualization of yearly activity</p>
      </div>
    </div>
  );
}

export default App;
