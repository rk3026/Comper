/*
 * Handles fetch requests for /api/submissions
 * and sends any SQL queries to Submission.js
 */

const submissionModel = require('../Models/Submission');

async function listSubmissions(req, res) {
  try {
    const submissions = await submissionModel.listSubmissions(req.body.compID);
    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function getCommentsForSubmission(req, res) {
  try {
    const { subID } = req.params;
    const comments = await submissionModel.getCommentsBySubmissionId(subID);
    res.status(200).json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

async function addCommentToSubmission(req, res) {
  try {
    const { subID, content } = req.body;
    const result = await submissionModel.addCommentToSubmission(subID, content);
    res.status(201).json({ message: 'Comment added', id: result.insertId });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

async function getSubmission(req, res) {
  try {
    const subID = req.body.id;
    const submission = await submissionModel.getSubmission(subID);
    res.status(200).json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function createSubmission(req, res) {
    try {
	const data = {
	    compID: req.body.compID,
	    submissionTime: (new Date()).toISOString(),
	    voteCount: 0,
	    totalCriteriaPoints: 0,
	    title: req.body.title,
	    description: req.body.description,
	    attachmentURL: req.body.attachmentURL
	};

	await submissionModel.createSubmission(data);
	res.status(201).json({ message: "submission was successful" });
    } catch (err) {
	console.log(err.message);
	res.status(500).json({ error: err.message });
    }
}

module.exports = {listSubmissions, getSubmission, createSubmission, getCommentsForSubmission, addCommentToSubmission };

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
