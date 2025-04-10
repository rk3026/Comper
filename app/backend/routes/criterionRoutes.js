/*
 * Reroutes fetch requests for /api/criteria
 */

// routes/criterionRoutes.js
const express = require('express');
const router = express.Router();
const criterionController = require('../Controllers/CriterionController');

// Endpoint to create a new criterion (if needed by admins)
router.post('/', criterionController.createCriterion);

// Endpoint to retrieve criteria for a specific competition
router.get('/:compID', criterionController.getCriteriaByCompetition);

module.exports = router;
