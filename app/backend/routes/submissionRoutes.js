/*
 * Reroutes fetch requests for /api/submissions
 */

const express = require('express');
const router = express.Router();
const submissionController = require('../Controllers/SubmissionController');

// Route to fetch submission details (POST /details)
router.post('/details/:subID', submissionController.getSubmission);

// Route to fetch comments for a specific submission (GET /:subID/comments)
router.get('/comments/:subID', submissionController.getCommentsForSubmission);

// Route to add a comment to a specific submission (POST /:subID/comments)
router.post('/comments/:subID', submissionController.addCommentToSubmission);

router.post('/create/:compID', submissionController.createSubmission);

router.post('/:compID', submissionController.listSubmissions);

module.exports = router;
