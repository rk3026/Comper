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
    console.log('Pool:', pool);
  } catch (err) {
    console.error('Database connection error:', err.message);
    throw new Error('Failed to connect to the database');
  }
}

async function initializeDatabase() {
  try {
    // Check if the 'posts' table exists, and create it if it doesn't
    const queryPosts = `
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'posts' AND xtype = 'U')
      BEGIN
        CREATE TABLE posts (
          id INT PRIMARY KEY IDENTITY(1,1),
          title NVARCHAR(255),
          content NVARCHAR(255),
          timestamp DATETIME DEFAULT GETDATE()
        );
      END`
    ;
    // Check if the 'competitions' table exists, and create it if it doesn't
    const queryCompetitions = `
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'competitions' AND xtype = 'U')
      BEGIN
        CREATE TABLE competitions (
          id INT PRIMARY KEY IDENTITY(1,1),
          title NVARCHAR(255),
          description NVARCHAR(255),
          deadline DATE,
          timestamp DATETIME DEFAULT GETDATE()
        );
      END`
    ;
    
    await pool.request().query(queryPosts);
    await pool.request().query(queryCompetitions);
    
    console.log('Tables created/verified successfully');
  } catch (err) {
    console.error('Error initializing database:', err.message);
  }
}

// Provide a getter for the pool
function getPool() {
  if (!pool) {
    throw new Error('Database pool is not initialized');
  }
  return pool;
}

module.exports = { connectToDatabase, initializeDatabase, getPool };
