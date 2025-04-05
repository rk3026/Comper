const competitionModel = require('../Models/Competition');

/**
 * Controller to list all competitions.
 */
async function listCompetitions(req, res) {
  try {
    const competitions = await competitionModel.getCompetitions();
    res.status(200).json(competitions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getCompetitionDetails(req, res) {
  try {
    const details = await competitionModel.getCompetitionDetails(req.body.id);
    const submissions = await competitionModel.getSubmissions(req.body.id);
    res.status(200).json({ details: details, submissions: submissions });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
}

/**
 * Controller to create a new competition.
 */
async function createCompetition(req, res) {
/*
const data = {
      title: req.body.title,
      filetype: req.body.filetype,
      description: req.body.description,
      startDesc: req.body.startDesc || '', // optional field
      startTime: req.body.startTime,
      deadline: body.deadline,
      voteEndTime: body.voteEndTime || body.deadline, // use deadline as default
      attachmentURL: body.attachmentURL
    };
*/

    await competitionModel.createCompetition(req.body);
    res.status(201).json({ message: 'Competition created successfully' });
}

module.exports = { listCompetitions, getCompetitionDetails, createCompetition };
