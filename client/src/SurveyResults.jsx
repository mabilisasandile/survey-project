import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './SurveyResults.css';

function SurveyResults() {
  const [data, setData] = useState(null);
  const [averageAge, setAverageAge] = useState(0);
  const [oldest, setOldest] = useState(null);
  const [youngest, setYoungest] = useState(null);
  const [pizzaPercentage, setPizzaPercentage] = useState(0);
  const [pastaPercentage, setPastaPercentage] = useState(0);
  const [papaAndWorsPercentage, setPapaAndWorsPercentage] = useState(0);
  const [watchMoviesPeople, setWatchMoviesPeople] = useState(0);
  const [listenRadioPeople, setListenRadioPeople] = useState(0);
  const [watchTVPeople, setWatchTVPeople] = useState(0);
  const [eatOutPeople, setEatOutPeople] = useState(0);

  useEffect(() => {
    Swal.fire({
      title: 'Loading Results...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    axios.get('http://localhost:5000/api/survey/fetchsurveys')
      .then(res => {
        Swal.close(); // Close loading modal
        setData(res.data);
        console.log("Survey Results:", res.data);

        if (res.data.length > 0) {
          const ages = res.data.map(survey => {
            const dob = new Date(survey.dob);
            const age = new Date().getFullYear() - dob.getFullYear();
            return age;
          });
          const totalAge = ages.reduce((acc, age) => acc + age, 0);
          setAverageAge(totalAge / ages.length);
        }

        const oldestSurvey = res.data.reduce((oldest, current) => {
          const currentDob = new Date(current.dob);
          const oldestDob = new Date(oldest.dob);
          return currentDob < oldestDob ? current : oldest;
        }, res.data[0]);
        setOldest(oldestSurvey ? oldestSurvey.name : "No data");

        const youngestSurvey = res.data.reduce((youngest, current) => {
          const currentDob = new Date(current.dob);
          const youngestDob = new Date(youngest.dob);
          return currentDob > youngestDob ? current : youngest;
        }, res.data[0]);
        setYoungest(youngestSurvey ? youngestSurvey.name : "No data");

        const pizzaLoversCount = res.data.filter(survey => survey.favoriteFoods.includes("Pizza")).length;
        setPizzaPercentage(((pizzaLoversCount / res.data.length) * 100).toFixed(2));

        const pastaLoversCount = res.data.filter(survey => survey.favoriteFoods.includes("Pasta")).length;
        setPastaPercentage(((pastaLoversCount / res.data.length) * 100).toFixed(2));

        const papaAndWorsLoversCount = res.data.filter(survey => survey.favoriteFoods.includes("Pap and Wors")).length;
        setPapaAndWorsPercentage(((papaAndWorsLoversCount / res.data.length) * 100).toFixed(2));

        const eatOutCount = res.data.filter(survey => survey.ratings.eatOut <= 3).length;
        setEatOutPeople(eatOutCount);

        const watchMoviesCount = res.data.filter(survey => survey.ratings.watchMovies <= 3).length;
        setWatchMoviesPeople(watchMoviesCount);

        const listenRadioCount = res.data.filter(survey => survey.ratings.listenRadio <= 3).length;
        setListenRadioPeople(listenRadioCount);

        const watchTVCount = res.data.filter(survey => survey.ratings.watchTV <= 3).length;
        setWatchTVPeople(watchTVCount);
      })
      .catch(() => {
        Swal.close();
        setData({ message: "Error fetching results." });
      });
  }, []);

  if (!data) return <p>No Surveys Available.</p>;
  if (data.message) return <p>{data.message}</p>;

  return (
    <div className='container'>
      <h2>Survey Results</h2>
      <table>
        <tbody>
          <tr><td><p>Total number of surveys:</p></td><td><p><b>{data.length}</b></p></td></tr>
          <tr><td><p>Average Age:</p></td><td><p><b>{averageAge.toFixed(0)}</b></p></td></tr>
          <tr><td><p>Oldest person who participated in survey:</p></td><td><p><b>{oldest}</b></p></td></tr>
          <tr><td><p>Youngest person who participated in survey:</p></td><td><p><b>{youngest}</b></p></td></tr>
          <br />
          <tr><td><p>Percentage of people who like Pizza:</p></td><td><p><b>{pizzaPercentage}%</b></p></td></tr>
          <tr><td><p>Percentage of people who like Pasta:</p></td><td><p><b>{pastaPercentage}%</b></p></td></tr>
          <tr><td><p>Percentage of people who like Pap and Wors:</p></td><td><p><b>{papaAndWorsPercentage}%</b></p></td></tr>
          <br />
          <tr><td><p>People who like to watch movies:</p></td><td><p><b>{watchMoviesPeople}</b></p></td></tr>
          <tr><td><p>People who like to listen to radio:</p></td><td><p><b>{listenRadioPeople}</b></p></td></tr>
          <tr><td><p>People who like to eat out:</p></td><td><p><b>{eatOutPeople}</b></p></td></tr>
          <tr><td><p>People who like to watch TV:</p></td><td><p><b>{watchTVPeople}</b></p></td></tr>
        </tbody>
      </table>
    </div>
  );
}

export default SurveyResults;