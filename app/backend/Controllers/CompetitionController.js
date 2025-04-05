// controllers/CompetitionController.js
const competitionModel = require('../Models/Competition');
const { v4: uuidv4 } = require('uuid');

/**
 * Controller to create a new competition.
 */
async function createCompetition(req, res) {
  try {
    // Create a competition object using data from the request body
    const data = {
      compID: uuidv4(), // Generate a unique ID
      title: req.body.title,
      description: req.body.description,
	startDesc: req.body.startDesc,
      fileType: req.body.fileType,
      attachmentURL: req.body.attachmentURL,
      startTime: req.body.startTime,
      deadline: req.body.deadline,
	voteEndTime: req.body.voteEndTime,
      status: req.body.status || 'Sub' // Default status (e.g., "Sub" for Submission phase)
    };

    // Call the model to create a competition in the database
    await competitionModel.createCompetition(data);
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
