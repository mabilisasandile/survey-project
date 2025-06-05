import React, { useState } from 'react';
import SurveyForm from './SurveyForm';
import SurveyResults from './SurveyResults';
import './App.css';

function App() {
  const [view, setView] = useState('form');

  return (
    <div>
      <div className="nav">
        <h2>_Surveys</h2>
        <button onClick={() => setView('form')}>FILL OUT SURVEY</button>
        <button onClick={() => setView('results')}>VIEW SURVEY RESULTS</button>
      </div>
      <div className="App">
      {view === 'form' ? <SurveyForm /> : <SurveyResults />}
      </div>
    </div>
  );
}

export default App;