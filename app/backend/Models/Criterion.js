const { sql, poolPromise } = require('../db/database');

async function createCriterion(data) {
  const pool = await poolPromise;
  await pool.request()
    .input('criterionID', sql.UniqueIdentifier, data.criterionID)
    .input('compID', sql.UniqueIdentifier, data.compID)
    .input('name', sql.NVarChar(255), data.name)
    .input('description', sql.Text, data.description)
    .input('point', sql.Int, data.point)
    .input('comment', sql.Text, data.comment)
    .query(`INSERT INTO Criterion (criterionID, compID, name, description, point, comment)
            VALUES (@criterionID, @compID, @name, @description, @point, @comment)`);
}

async function getCriteriaByCompetition(compID) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('compID', sql.UniqueIdentifier, compID)
    .query('SELECT * FROM Criterion WHERE compID = @compID');
  return result.recordset;
}

module.exports = { createCriterion, getCriteriaByCompetition };
