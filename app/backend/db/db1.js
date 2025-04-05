const sql = require('mssql');

const config = {
  user: 'your_user',
  password: 'your_password',
  server: 'localhost',
  database: 'your_database',
  options: {
    trustServerCertificate: true
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('SQL connected');
    return pool;
  })
  .catch(err => console.log('DB Connection Error:', err));

module.exports = { sql, poolPromise };