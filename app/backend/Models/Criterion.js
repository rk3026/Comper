// models/Criterion.js
const { sql, getPool } = require('../db/database');

/**
 * Creates a new criterion record in the database.
 * @param {Object} data - Criterion data.
 * @param {number} data.compID - The competition ID this criterion belongs to.
 * @param {string} data.name - The name of the criterion.
 * @param {string} data.description - A description of the criterion.
 * @param {number} data.maxPoints - The maximum points for this criterion.
 * @returns {Promise<void>}
 */
async function createCriterion(data) {
  try {
    const pool = getPool();
    await pool.request()
      .input('compID', sql.Int, data.compID)
      .input('name', sql.NVarChar(255), data.name)
      .input('description', sql.Text, data.description)
      .input('maxPoints', sql.Int, data.maxPoints)
      .query(`
        INSERT INTO criteria (compID, name, description, maxPoints)
        VALUES (@compID, @name, @description, @maxPoints)
      `);
  } catch (err) {
    console.error('SQL error in createCriterion:', err);
    throw err;
  }
}

/**
 * Retrieves all criteria for a given competition ID.
 * @param {number} compID - The competition ID.
 * @returns {Promise<Array>} - An array of criteria records.
 */
async function getCriteriaByCompetition(compID) {
  try {
    const pool = getPool();
    const result = await pool.request()
      .input('compID', sql.Int, compID)
      .query(`
        SELECT * FROM criteria
        WHERE compID = @compID
        ORDER BY name ASC
      `);
    return result.recordset;
  } catch (err) {
    console.error('SQL error in getCriteriaByCompetition:', err);
    throw err;
  }
}

module.exports = {
  createCriterion,
  getCriteriaByCompetition
};
