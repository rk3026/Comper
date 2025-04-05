const { 
    createThread, 
    listThreads, 
    getThreadWithComments,
    addCommentToThread 
  } = require('../models/Thread');
  
  // Create a new thread
  exports.createThread = async (req, res) => {
    try {
      const { name, topics } = req.body;
      const threadID = await createThread(name, topics); // topics = ['music', 'games']
      res.status(201).json({ message: 'Thread created', threadID });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // List all threads (optionally by topic)
  exports.listThreads = async (req, res) => {
    try {
      const topic = req.query.topic; // e.g., /api/threads?topic=music
      const threads = await listThreads(topic);
      res.json(threads);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Get a single thread and its comments
  exports.getThread = async (req, res) => {
    try {
      const { threadID } = req.params;
      const thread = await getThreadWithComments(threadID);
      res.json(thread);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Add a comment to a thread
  exports.addComment = async (req, res) => {
    try {
      const { threadID } = req.params;
      const { content } = req.body;
      await addCommentToThread(threadID, content);
      res.status(201).json({ message: 'Comment added' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  