const { executeQuery, dropDatabase, createDatabase } = require("./dbUtils");
const { v4: uuidv4 } = require("uuid");

const adminRoleId = uuidv4(),
  userRoleId = uuidv4();

const rowsToInsert = [
  `INSERT  INTO roles (id, rolename) VALUES ('${adminRoleId}', 'admin')`,
  `INSERT  INTO roles (id, rolename) VALUES ('${userRoleId}', 'user')`,
  `INSERT  INTO role_permissions (id, role_id, access) VALUES ('${uuidv4()}','${adminRoleId}', 'read')`,
  `INSERT  INTO role_permissions (id, role_id, access) VALUES ('${uuidv4()}','${adminRoleId}', 'write')`,
  `INSERT  INTO role_permissions (id, role_id, access) VALUES ('${uuidv4()}','${userRoleId}', 'read')`,
];

const populateDatabase = async () => {
  await dropDatabase();
  await createDatabase();
  rowsToInsert.forEach(async (row) => {
    await executeQuery(row);
  });
};

populateDatabase();
