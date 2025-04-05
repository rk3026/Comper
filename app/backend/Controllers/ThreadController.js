const threadModel = require('../Models/Thread');

/**
 * Controller to create a new thread.
 */
async function createThread(req, res) {
  try {
    const { name, topics } = req.body; // Expecting: { name: '...', topics: ['music', 'games'] }
    const threadID = await threadModel.createThread(name, topics);
    res.status(201).json({ message: 'Thread created', threadID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Controller to list all threads, optionally filtered by topic.
 */
async function listThreads(req, res) {
  try {
    const topic = req.query.topic; // e.g. /api/threads?topic=music
    const threads = await threadModel.listThreads(topic);
    res.status(200).json(threads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Controller to get a thread and its comments.
 */
async function getThreadWithComments(req, res) {
  try {
    const { threadID } = req.params;
    const thread = await threadModel.getThreadWithComments(threadID);
    res.status(200).json(thread);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Controller to add a comment to a thread.
 */
async function addCommentToThread(req, res) {
  try {
    const { threadID } = req.params;
    const { content, replyTo } = req.body;

    // Insert the comment into the database
    const result = await threadModel.addCommentToThread(threadID, content, replyTo);

    // Assuming `result` contains the inserted comment's data, including `id` and `creationTime`
    res.status(201).json({
      id: result.id, // The ID assigned to the new comment
      content: result.content,
      creationTime: result.creationTime,
      replyTo: result.replyTo,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = {
  createThread,
  listThreads,
  getThreadWithComments,
  addCommentToThread
};
