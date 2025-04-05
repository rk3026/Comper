const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/posts');
const compRoutes = require('./routes/competitions');
const { connectToDatabase, initializeDatabase } = require('./db/database');

const app = express();
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to the database and initialize tables
    await connectToDatabase();
    await initializeDatabase();
    
    app.use(cors());
    app.use(bodyParser.json());

    // Use the routes after the database is connected and initialized
    app.use('/api/posts', postRoutes);
    app.use('/api/competitions', compRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err.message);
  }
}


startServer();
