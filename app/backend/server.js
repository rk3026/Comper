const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/posts');
<<<<<<< HEAD
const compRoutes1 = require('./routes/competitions');
const compRoutes = require('./routes/competitionRoutes');
const submissionRoutes = require('./routes/submissionsRoutes');
const commentRoutes = require('./routes/commentRoutes');
const criterionRoutes = require('./routes/criterionRoutes');

=======
const compRoutes = require('./routes/competitionRoutes');
>>>>>>> 461dd72a82defc7b5eeb5ed024f433903226281b
const { connectToDatabase, initializeDatabase } = require('./db/database');

const app = express();
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to the database and initialize tables
    await connectToDatabase();
    
    app.use(cors());
    app.use(bodyParser.json());

    // Use the routes after the database is connected and initialized
    app.use('/api/posts', postRoutes);
    app.use('/api/competitions', compRoutes);
    app.use('/api/submissions', submissionRoutes);
    app.use('/api/comments', commentRoutes);
    app.use('/api/criteria', criterionRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err.message);
  }
}


startServer();
