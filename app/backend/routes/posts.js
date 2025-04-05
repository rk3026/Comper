const express = require('express');
const router = express.Router();
const { getPool } = require('../db/database');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const pool = getPool();  // Use the getter to access the pool
    const result = await pool.request().query('SELECT * FROM posts ORDER BY timestamp DESC');

    if (result.recordset.length === 0) {
      return res.status(200).json({ message: 'No posts found' });
    }

    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching posts:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  try {
    const pool = getPool();  // Use the getter to access the pool
    const result = await pool.request()
      .input('title', sql.NVarChar, title)
      .input('content', sql.NVarChar, content)
      .query('INSERT INTO posts (title, content) VALUES (@title, @content)');
    
    res.status(201).json({ id: result.rowsAffected[0] });  // rowsAffected[0] gives the number of rows affected
  } catch (err) {
    console.error('Error inserting post:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
