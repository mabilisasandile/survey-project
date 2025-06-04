import surveyModel from "../models/Survey.js";

export const getSurveys = async (req, res) => {
  try {
    const surveys = await surveyModel.find();
    res.status(200).json(surveys);
  } catch (error) {
    console.error("Error fetching surveys:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const createSurvey = async (req, res) => {
  try {
    const surveyData = req.body;
    const newSurvey = new surveyModel(surveyData);
    await newSurvey.save();
    res.status(201).json(newSurvey);
  } catch (error) {
    console.error("Error creating survey:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateSurvey = async (req, res) => {
  try {
    const { id } = req.params;
    const surveyData = req.body;
    const updatedSurvey = await surveyModel.findByIdAndUpdate(id, surveyData, { new: true });
    if (!updatedSurvey) {
      return res.status(404).json({ message: "Survey not found" });
    }
    res.status(200).json(updatedSurvey);
  } catch (error) {
    console.error("Error updating survey:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const deleteSurvey = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSurvey = await surveyModel.findByIdAndDelete(id);
    if (!deletedSurvey) {
      return res.status(404).json({ message: "Survey not found" });
    }
    res.status(200).json({ message: "Survey deleted successfully" });
  } catch (error) {
    console.error("Error deleting survey:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}