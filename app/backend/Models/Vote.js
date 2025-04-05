// models/Vote.js
const { queryFromPool } = require('./Utility');

async function castVote(subID, totalCriterionPoints) {
    queryFromPool(`
            UPDATE submission
            SET voteCount = voteCount + 1, totalCriteriaPoints = totalCriteriaPoints + ${totalCriterionPoints}
            WHERE id = ${subID};
        `);
}

  module.exports = { castVote };