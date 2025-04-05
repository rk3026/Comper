/*
 * Reroutes fetch requests for /api/topics
 */

const express = require('express');
const router = express.Router();
const topicController = require('../Controllers/TopicController');

// GET /api/topics - List all unique topics
router.get('/', topicController.listAllTopics);

// GET /api/topics/:name/competitions - Get competitions with a given topic
router.get('/:name/competitions', topicController.getCompetitionsByTopic);

// GET /api/topics/:name/threads - Get threads with a given topic
router.get('/:name/threads', topicController.getThreadsByTopic);

module.exports = router;
