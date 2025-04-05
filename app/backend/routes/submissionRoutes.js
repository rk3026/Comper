// routes/submissionRoutes.js
const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/SubmissionController');

// POST /api/submissions - Create a new submission
router.post('/', submissionController.createSubmission);

// GET /api/submissions/competition/:compID - List all submissions for a competition
router.get('/competition/:compID', submissionController.listSubmissions);

// GET /api/submissions/:subID - Retrieve a single submission by ID
router.get('/:subID', submissionController.getSubmission);

// PUT /api/submissions/:subID - Update a submission by ID
router.put('/:subID', submissionController.updateSubmission);

// DELETE /api/submissions/:subID - Delete a submission by ID
router.delete('/:subID', submissionController.deleteSubmission);

module.exports = router;
