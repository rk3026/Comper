// controllers/VotingController.js
const voteModel = require('../Models/Vote'); 

async function castVote(req, res)
{
  try {
    voteModel.castVote(req.params.subID, req.params.points);
    res.status(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { castVote };

/*
const { castVote } = require('../models/Vote');       // If you store votes
const { getSubmission, updateSubmission } = require('../models/Submission');
const { verifyCaptcha } = require('../utils/captcha'); // If using CAPTCHA
const { v4: uuidv4 } = require('uuid');


exports.castVote = async (req, res) => {
  try {
    const { subID, criteriaRatings, captchaToken } = req.body;

    // 1. Verify CAPTCHA
    const isValid = await verifyCaptcha(captchaToken);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid CAPTCHA' });
    }

    // 2. Calculate overall vote value (if using criteria)
    const total = criteriaRatings.reduce((acc, rating) => acc + rating, 0);
    const overallVote = total / criteriaRatings.length;

    // 3. Insert the vote record (optional)
    await castVote({
      voteID: uuidv4(),
      subID,
      voteValue: overallVote,
      createdAt: new Date()
    });

    // 4. Get existing submission
    const submission = await getSubmission(subID);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    // 5. Recompute rating
    const currentVoteCount = submission.voteCount || 0;
    const currentRating = submission.rating || 0;
    const newVoteCount = currentVoteCount + 1;
    const newRating = ((currentRating * currentVoteCount) + overallVote) / newVoteCount;

    // 6. Update the submission
    await updateSubmission(subID, { rating: newRating, voteCount: newVoteCount });

    // 7. Respond
    res.json({
      message: 'Vote cast successfully',
      newRating,
      newVoteCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
*/
