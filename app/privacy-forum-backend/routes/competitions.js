const express = require('express');
const router = express.Router();

// Sample data for competitions
const competitions = [
    { id: 1, name: 'Coding Challenge', description: 'A coding competition' },
    { id: 2, name: 'Art Contest', description: 'An art competition' },
];

// Route to get all competitions
router.get('/', (req, res) => {
    res.json(competitions);
});

module.exports = router;
