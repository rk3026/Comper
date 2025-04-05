const express = require('express');
const router = express.Router();
const { getPool } = require('../db/database');

// Route to get all competitions from the database
router.get('/', async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool
      .request()
      .query('SELECT * FROM competitions');
      // id, title, filetype, description, startDesc, startTime, deadline, voteEndTime, attachmentURL

    res.json(result.recordset);
    console.log(result)
  } catch (error) {
    console.error('Error fetching competitions:', error.message);
    res.status(500).json({ error: 'Failed to fetch competitions' });
  }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const pool = getPool();
      const result = await pool
        .request()
        .input('id', id)
        .query('SELECT * FROM Competitions WHERE id = @id');
  
      if (result.recordset.length === 0) {
        return res.status(404).json({ error: 'Competition not found' });
      }
  
      res.json(result.recordset[0]);
    } catch (error) {
      console.error('Error fetching competition:', error.message);
      res.status(500).json({ error: 'Failed to fetch competition' });
    }
  });
  

module.exports = router;
