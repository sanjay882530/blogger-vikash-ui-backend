import mysql from "mysql2";
// Database connection
const pool = mysql.createPool({
  host: "mysql.railway.internal",
  user: "root",
  password: "jEHnNFEATIXFmlIdZLMGhkJWYQvikcMf",
  database: "railway",
});
// const promisePool = pool.promise();
// Function to initialize the counter table
async function initializeCounterTable() {
  const connection = pool.getConnection();
  try {
    await connection.query(`
        CREATE TABLE IF NOT EXISTS user_id_counter (
          id INT NOT NULL AUTO_INCREMENT,
          last_id INT NOT NULL DEFAULT 0,
          PRIMARY KEY (id)
        )
      `);

    // Insert initial row if the table is empty
    await connection.query(`
        INSERT INTO user_id_counter (id, last_id)
        SELECT 1, 0
        WHERE NOT EXISTS (SELECT * FROM user_id_counter)
      `);
  } finally {
    connection.release();
  }
}

// Function to get the next user ID
export async function getNextUserId() {
  const connection = pool.getConnection();
  try {
    await connection.beginTransaction();

    const [rows] = await connection.query(
      "UPDATE user_id_counter SET last_id = last_id + 1 WHERE id = 1"
    );
    if (rows.affectedRows === 0) {
      throw new Error("Failed to update user ID counter");
    }

    const [result] = await connection.query(
      "SELECT last_id FROM user_id_counter WHERE id = 1"
    );
    const newUserId = result[0].last_id;

    await connection.commit();
    return newUserId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
