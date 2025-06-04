import React, { useState } from 'react';
import axios from 'axios';

function SurveyForm() {
  const [form, setForm] = useState({
    name: '', surname: '', email: '', age: '', date: '',
    favoriteFoods: [],
    ratings: { eatOut: '', watchMovies: '', watchTV: '', listenRadio: '' }
  });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCheckbox = e => {
    const foods = form.favoriteFoods.includes(e.target.value)
      ? form.favoriteFoods.filter(f => f !== e.target.value)
      : [...form.favoriteFoods, e.target.value];
    setForm({ ...form, favoriteFoods: foods });
  };

  const handleRatingChange = e => {
    setForm({
      ...form,
      ratings: { ...form.ratings, [e.target.name]: Number(e.target.value) }
    });
  };

  const validate = () => {
    const { name, surname, email, age, date, ratings } = form;
    return (
      name && surname && email && date &&
      age >= 5 && age <= 120 &&
      Object.values(ratings).every(r => r >= 1 && r <= 5)
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return setMessage("Please complete all fields correctly.");
    try {
      await axios.post('http://localhost:5000/api/survey/createsurvey', form);
      setMessage("Survey submitted successfully.");
      setForm({
        name: '', surname: '', email: '', age: '', date: '',
        favoriteFoods: [], ratings: { eatOut: '', watchMovies: '', watchTV: '', listenRadio: '' }
      });
    } catch (err) {
      setMessage("Error submitting survey.");
    }
  };

  const foodOptions = ["Pizza", "Pasta", "Pap and Wors", "Chicken Stir Fry", "Beef Stir Fry", "Other"];
  const ratingQuestions = ["eatOut", "watchMovies", "watchTV", "listenRadio"];

  return (
    <form onSubmit={handleSubmit}>
      <h2>Survey Form</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="surname" placeholder="Surname" value={form.surname} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} />
      <input name="date" type="date" value={form.date} onChange={handleChange} />

      <div>
        <h4>Favorite Foods</h4>
        {foodOptions.map(food => (
          <label key={food}>
            <input
              type="checkbox"
              value={food}
              checked={form.favoriteFoods.includes(food)}
              onChange={handleCheckbox}
            /> {food}
          </label>
        ))}
      </div>

      <div>
        <h4>Ratings (1-5)</h4>
        {ratingQuestions.map(q => (
          <div key={q}>
            <span>{q}</span>
            {[1,2,3,4,5].map(num => (
              <label key={num}>
                <input
                  type="radio"
                  name={q}
                  value={num}
                  checked={form.ratings[q] === num}
                  onChange={handleRatingChange}
                /> {num}
              </label>
            ))}
          </div>
        ))}
      </div>

      <button type="submit">Submit</button>
      <p>{message}</p>
    </form>
  );
}

export default SurveyForm;