import React, { useState } from 'react';
import SurveyForm from './SurveyForm';
import SurveyResults from './SurveyResults';
import './App.css';

function App() {
  const [view, setView] = useState('form');

  return (
    <div className="App">
      <nav>
        <button onClick={() => setView('form')}>Fill Out Survey</button>
        <button onClick={() => setView('results')}>View Survey Results</button>
      </nav>
      {view === 'form' ? <SurveyForm /> : <SurveyResults />}
    </div>
  );
}

export default App;