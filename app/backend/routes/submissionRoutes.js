const express = require('express');
const router = express.Router();
const submissionController = require('../Controllers/SubmissionController');

// Route to fetch submission details (POST /details)
router.post('/details', submissionController.getSubmission);

// Route to fetch comments for a specific submission (GET /:subID/comments)
router.get('/:subID/comments', submissionController.getCommentsForSubmission);

// Route to add a comment to a specific submission (POST /:subID/comments)
router.post('/:subID/comments', submissionController.addCommentToSubmission);

module.exports = router;
