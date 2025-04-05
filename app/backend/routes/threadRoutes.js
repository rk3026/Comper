const express = require('express');
const router = express.Router();
const threadController = require('./Controllers/threadController');

// POST /api/threads - Create a new thread
router.post('/', threadController.createThread);

// GET /api/threads - List all threads (optionally filter by topic with ?topic=name)
router.get('/', threadController.listThreads);

// GET /api/threads/:threadID - Get a thread and its comments
router.get('/:threadID', threadController.getThreadWithComments);

// POST /api/threads/:threadID/comments - Add a comment to a thread
router.post('/:threadID/comments', threadController.addCommentToThread);

module.exports = router;
