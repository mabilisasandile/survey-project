import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './SurveyForm.css';

function SurveyForm() {
  const [form, setForm] = useState({
    name: '', email: '', dob: '', contact: '',
    favoriteFoods: [],
    ratings: { watchMovies: '', listenRadio: '', eatOut: '', watchTV: '' }
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCheckbox = e => {
    const updatedFoods = form.favoriteFoods.includes(e.target.value)
      ? form.favoriteFoods.filter(f => f !== e.target.value)
      : [...form.favoriteFoods, e.target.value];
    setForm({ ...form, favoriteFoods: updatedFoods });
  };

  const handleRatingChange = e => {
    setForm({
      ...form,
      ratings: { ...form.ratings, [e.target.name]: Number(e.target.value) }
    });
  };

  const validate = () => {
    const { name, email, dob, contact, ratings } = form;
    return (
      name && email && dob && contact &&
      Object.values(ratings).every(r => r >= 1 && r <= 5)
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validate()) {
      Swal.fire('Incomplete Form', 'Please complete all fields correctly.', 'warning');
      return;
    }

    try {
      Swal.fire({
        title: 'Submitting survey...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      await axios.post('http://localhost:5000/api/survey/createsurvey', form);

      Swal.fire('Success', 'Survey submitted successfully!', 'success');

      setForm({
        name: '', email: '', dob: '', contact: '',
        favoriteFoods: [],
        ratings: { watchMovies: '', listenRadio: '', eatOut: '', watchTV: '' }
      });

    } catch (error) {
      Swal.fire('Submission Failed', 'There was an error submitting your survey.', 'error');
    }
  };

  const foodOptions = ["Pizza", "Pasta", "Pap and Wors", "Other"];
  const questions = [
    { key: 'watchMovies', text: 'I like to watch movies' },
    { key: 'listenRadio', text: 'I like to listen to radio' },
    { key: 'eatOut', text: 'I like to eat out' },
    { key: 'watchTV', text: 'I like to watch TV' }
  ];
  const ratingLabels = ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'];

  return (
    <form className="survey-form" onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <fieldset>
              <td>
                <h3>Personal Details:</h3>
              </td>
              <td className="personal-details">
                <label>Full Names:</label>
                <input name="name" value={form.name} onChange={handleChange} type="text" required />
                <label>Email:</label>
                <input name="email" value={form.email} onChange={handleChange} type="email" required />
                <label>Date of Birth:</label>
                <input name="dob" value={form.dob} onChange={handleChange} type="date" required />
                <label>Contact Number:</label>
                <input name="contact" value={form.contact} onChange={handleChange} type="text" required />
              </td>
            </fieldset>
          </tr>
        </tbody>
      </table>

      <div className="food-section">
        <table>
          <tbody>
            <tr>
              <td>
                <p>What is your favorite food?</p>
              </td>
              <td>
                {foodOptions.map(food => (
                  <label key={food}>
                    <input
                      type="checkbox"
                      value={food}
                      checked={form.favoriteFoods.includes(food)}
                      onChange={handleCheckbox}
                    />
                    {food}
                  </label>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="ratings-section">
        <p>Please rate your level of agreement on a scale from 1 to 5:</p>
        <table>
          <thead>
            <tr>
              <th></th>
              {ratingLabels.map(label => (
                <th key={label}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {questions.map(q => (
              <tr key={q.key}>
                <td>{q.text}</td>
                {ratingLabels.map((_, idx) => (
                  <td key={idx}>
                    <input
                      type="radio"
                      name={q.key}
                      value={idx + 1}
                      checked={form.ratings[q.key] === idx + 1}
                      onChange={handleRatingChange}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="submit-section">
        <button type="submit">SUBMIT</button>
      </div>
    </form>
  );
}

export default SurveyForm;