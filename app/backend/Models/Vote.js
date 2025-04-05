/*
 * Handles SQL queries for voting
 */

// models/Vote.js
const { queryFromPool } = require('./Utility');

async function castVote(subID, totalCriterionPoints) {
    queryFromPool(`
            UPDATE submissions
            SET voteCount = voteCount + 1, totalCriteriaPoints = totalCriteriaPoints + ${totalCriterionPoints}
            WHERE id = ${subID};
        `);
}

  module.exports = { castVote };
