/*
 * Reroutes fetch requests /api/vote
 */

const express = require('express');
const router = express.Router();
const votingController = require('../Controllers/VotingController');

router.put('/:subID/:points', votingController.castVote);

module.exports = router;
