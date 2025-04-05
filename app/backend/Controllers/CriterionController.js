// controllers/CriterionController.js
const { createCriterion, getCriteriaByCompetition } = require('../models/Criterion');
const { v4: uuidv4 } = require('uuid');

exports.createCriterion = async (req, res) => {
  try {
    const data = {
      ...req.body,
      criterionID: uuidv4()
    };
    await createCriterion(data);
    res.status(201).json({ message: 'Criterion created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCriteriaByCompetition = async (req, res) => {
  try {
    const { compID } = req.params;
    const criteria = await getCriteriaByCompetition(compID);
    res.json(criteria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
