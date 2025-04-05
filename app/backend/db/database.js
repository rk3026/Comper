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

// Provide a getter for the pool
function getPool() {
  if (!pool) {
    throw new Error('Database pool is not initialized');
  }
  return pool;
}

module.exports = { connectToDatabase, getPool };
