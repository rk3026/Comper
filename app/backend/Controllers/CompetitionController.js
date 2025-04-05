const competitionModel = require('../Models/Competition');

/**
 * Controller to create a new competition.
 */
async function createCompetition(req, res) {
  try {
    const data = {
      title: req.body.title,
      filetype: req.body.filetype,
      description: req.body.description,
      startDesc: req.body.startDesc || '', // optional field
      startTime: req.body.startTime,
      deadline: req.body.deadline,
      voteEndTime: req.body.voteEndTime || req.body.deadline, // use deadline as default
      attachmentURL: req.body.attachmentURL
    };

    await competitionModel.createCompetition(data);
    res.status(201).json({ message: 'Competition created successfully' });
  } catch (err) {
    console.error('Create competition error:', err);
    res.status(500).json({ error: err.message });
  }
}