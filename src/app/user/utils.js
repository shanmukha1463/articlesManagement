const { executeQuery } = require("../../db/dbUtils");

const getRoleId = async (role) => {
  const result = await executeQuery(
    `SELECT id FROM roles WHERE rolename = '${role}';`
  );
  return result[0].id;
};

module.exports = { getRoleId };
