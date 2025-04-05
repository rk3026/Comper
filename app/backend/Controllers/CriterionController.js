/*
 * Handles fetch requests for /api/criteria
 * and sends any SQL queries to Criterion.js
 */

// controllers/CriterionController.js
const {
  createCriterion: createCriterionModel,
  getCriteriaByCompetition: getCriteriaByCompetitionModel
} = require('../Models/Criterion');

exports.createCriterion = async (req, res) => {
  try {
    // Destructure the expected fields from the request body
    const { compID, name, description, maxPoints } = req.body;

    // Basic validation
    if (!compID || !name || maxPoints === undefined) {
      return res.status(400).json({ error: 'compID, name, and maxPoints are required.' });
    }

    // Prepare data, ensuring numeric fields are converted to numbers
    const data = {
      compID: parseInt(compID, 10),
      name,
      description: description || '',
      maxPoints: parseInt(maxPoints, 10)
    };

    await createCriterionModel(data);
    res.status(201).json({ message: 'Criterion created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCriteriaByCompetition = async (req, res) => {
  try {
    const { compID } = req.params;

    if (!compID) {
      return res.status(400).json({ error: 'Competition ID is required.' });
    }

    const criteria = await getCriteriaByCompetitionModel(parseInt(compID, 10));
    res.status(200).json(criteria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
