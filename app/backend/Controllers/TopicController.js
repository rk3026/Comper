/*
 * Handles fetch requests for /api/topics
 * and sends any SQL queries to Topic.js
 */

const topicModel = require('../Models/Topic');

// Handles the fetch request for retrieving all topics
async function listAllTopics(req, res) {
  try {
    const topics = await topicModel.getAllTopics();
    res.status(200).json(topics);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

// Handles the fetch request for retrieving all competitions under a certain topic
async function getCompetitionsByTopic(req, res) {
  try {
    const { name } = req.params;
    const competitions = await topicModel.getCompetitionsByTopic(name);
    res.status(200).json(competitions);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

// Handles the fetch request for retrieving all threads under a certain topic
async function getThreadsByTopic(req, res) {
  try {
    const { name } = req.params;
    const threads = await topicModel.getThreadsByTopic(name);
    res.status(200).json(threads);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  listAllTopics,
  getCompetitionsByTopic,
  getThreadsByTopic,
};
