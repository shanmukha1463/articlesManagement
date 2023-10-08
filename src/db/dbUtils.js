const sqlite3 = require("sqlite3").verbose();
const fs = require("fs/promises");

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQlite database.");
});

const executeQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getTableNames = () => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT name FROM sqlite_master WHERE type='table'",
      (err, tables) => {
        if (err) {
          reject(err);
        } else {
          resolve(tables);
        }
      }
    );
  });
};

const dropTable = async (tableName) => {
  return new Promise((resolve, reject) => {
    const dropQuery = `DROP TABLE IF EXISTS ${tableName}`;
    db.run(dropQuery, (dropErr) => {
      if (dropErr) {
        reject(dropErr);
      } else {
        resolve();
      }
    });
  });
};

const dropDatabase = async () => {
  try {
    const tables = await getTableNames();
    for (const table of tables) {
      const tableName = table.name;
      await dropTable(tableName);
      console.log(`Dropped table ${tableName}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const createDatabase = async () => {
  try {
    const currentDir = __dirname;
    const sqlSchema = await fs.readFile(currentDir + "/schema.sql", "utf8");

    await new Promise((resolve, reject) => {
      db.exec(sqlSchema, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    console.log("Database schema executed successfully.");
  } catch (error) {
    console.error("Error executing the schema:", error);
  }
};

module.exports = { db, executeQuery, dropDatabase, createDatabase};
