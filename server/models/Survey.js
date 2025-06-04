import mongoose from 'mongoose';

const SurveySchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  age: Number,
  date: Date,
  favoriteFoods: [String],
  ratings: {
    eatOut: Number,
    watchMovies: Number,
    watchTV: Number,
    listenRadio: Number,
  }
});

const surveyModel = mongoose.models.survey || mongoose.model('survey', SurveySchema);
export default surveyModel;