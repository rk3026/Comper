// controllers/CompetitionController.js
const competitionModel = require('../Models/Competition');
const { v4: uuidv4 } = require('uuid');

/**
 * Controller to create a new competition.
 */
async function createCompetition(req, res) {
  try {
    // Call the model to create a competition in the database
    await competitionModel.createCompetition(req.body);
    res.status(201).json({ message: 'Competition created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Controller to list all competitions.
 */
async function listCompetitions(req, res) {
  try {
    const competitions = await competitionModel.getCompetitions();
    res.status(200).json(competitions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createCompetition, listCompetitions };
