const submissionModel = require('../Models/Submission');

module.exports.getSubmission = async (req, res) => {
  try {
    const subID = req.body.id;
    const submission = await submissionModel.getSubmission(subID);
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/*
const { 
    createSubmission, 
    listSubmissions, 
    getSubmission, 
    updateSubmission, 
    deleteSubmission 
  } = require('../Models/Submission');
  const { v4: uuidv4 } = require('uuid');
  
  
  exports.createSubmission = async (req, res) => {
    try {
      const data = {
        ...req.body,
        subID: uuidv4(),
        submittedAt: new Date(),
        rating: req.body.rating || 0,
        voteCount: req.body.voteCount || 0
      };
      await createSubmission(data);
      res.status(201).json({ message: 'Submission created successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.listSubmissions = async (req, res) => {
    try {
      // Expecting compID as a route parameter (e.g., /api/submissions/competition/:compID)
      const { compID } = req.params;
      const submissions = await listSubmissions(compID);
      res.json(submissions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getSubmission = async (req, res) => {
    try {
      const { subID } = req.params;
      const submission = await getSubmission(subID);
      res.json(submission);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.updateSubmission = async (req, res) => {
    try {
      const { subID } = req.params;
      await updateSubmission(subID, req.body);
      res.json({ message: 'Submission updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.deleteSubmission = async (req, res) => {
    try {
      const { subID } = req.params;
      await deleteSubmission(subID);
      res.json({ message: 'Submission deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  */
