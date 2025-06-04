import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SurveyResults() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/survey/fetchsurveys')
      .then(res => setData(res.data))
      .catch(() => setData({ message: "Error fetching results." }));
  }, []);

  if (!data) return <p>Loading...</p>;
  if (data.message) return <p>{data.message}</p>;

  return (
    <div>
      <h2>Survey Results</h2>
      <p>Total Surveys: {data.totalSurveys}</p>
      <p>Average Age: {data.avgAge}</p>
      <p>Oldest: {data.oldest}</p>
      <p>Youngest: {data.youngest}</p>
      <p>Pizza Lovers (%): {data.pizzaPercentage}</p>
      <p>Average Eat Out Rating: {data.avgEatOutRating}</p>
    </div>
  );
}

export default SurveyResults;