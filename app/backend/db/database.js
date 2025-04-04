const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

let pool;

async function connectToDatabase() {
  try {
    pool = await sql.connect(config);
    console.log('Connected to Azure SQL Database');
  } catch (err) {
    console.error('Database connection error:', err.message);
    throw new Error('Failed to connect to the database');
  }
}

async function initializeDatabase() {
  try {
    const queryPosts = `
      CREATE TABLE IF NOT EXISTS posts (
        id INT PRIMARY KEY IDENTITY(1,1),
        title NVARCHAR(255),
        content NVARCHAR(255),
        timestamp DATETIME DEFAULT GETDATE()
      )
    `;
    const queryCompetitions = `
      CREATE TABLE IF NOT EXISTS competitions (
        id INT PRIMARY KEY IDENTITY(1,1),
        title NVARCHAR(255),
        description NVARCHAR(255),
        deadline DATE,
        timestamp DATETIME DEFAULT GETDATE()
      )
    `;
    
    await pool.request().query(queryPosts);
    await pool.request().query(queryCompetitions);
    
    console.log('Tables created/verified successfully');
  } catch (err) {
    console.error('Error initializing database:', err.message);
  }
}

module.exports = { connectToDatabase, pool, initializeDatabase };
