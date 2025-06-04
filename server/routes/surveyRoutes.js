import express from 'express';
import { getSurveys, createSurvey, updateSurvey, deleteSurvey } from '../controllers/SurveyController.js';

const router = express.Router();

// Define routes for survey operations
router.get('/fetchsurveys', getSurveys); // Get all surveys
router.post('/createsurvey', createSurvey); // Create a new survey
router.put('/updatesurvey/:id', updateSurvey); // Update a survey by ID
router.delete('/delete/:id', deleteSurvey); // Delete a survey by ID

export default router;