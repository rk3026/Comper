// routes/competitionRoutes.js
const express = require('express');
const router = express.Router();
const competitionController = require('../Controllers/CompetitionController');

// GET /api/competitions - Retrieve a list of competitions
router.get('/', competitionController.listCompetitions);

// GET /api/competitions/details - Retrieve a single competition by ID
router.post('/details', competitionController.getCompetitionDetails);

// POST /api/competitions - Create a new competition
router.post('/create', competitionController.createCompetition);

// PUT /api/competitions/:compID - Update a competition by ID
//router.put('/:compID', competitionController.updateCompetition);

// DELETE /api/competitions/:compID - Delete a competition by ID
//router.delete('/:compID', competitionController.deleteCompetition);

module.exports = router;
