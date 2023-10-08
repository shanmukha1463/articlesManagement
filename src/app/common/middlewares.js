const { executeQuery } = require("../../db/dbUtils");

const checkWriteAccess = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const result = await executeQuery(
      `
      SELECT 
          * 
      FROM 
          users 
              INNER JOIN 
          roles
      ON 
          users.role_id = roles.id
              INNER JOIN
          role_permissions
      ON
          roles.id = role_permissions.role_id
      WHERE
          role_permissions.access = 'write'
          AND users.id = ?;`,
      [userId]
    );

    if (result.length > 0) {
      return next();
    }

    const error = new Error("Write Access Denied");
    next(error);
  } catch (error) {
    next(error);
  }
};

const checkReadAccess = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const result = await executeQuery(
      `
    SELECT 
        * 
    FROM 
        users 
            INNER JOIN 
        roles
    ON 
        users.role_id = roles.id
            INNER JOIN
        role_permissions
    ON
        roles.id = role_permissions.role_id
    WHERE
        role_permissions.access = 'read'
        AND users.id = ?;`,
      [userId]
    );

    if (result.length > 0) {
      return next();
    }

    const error = new Error("Read Access Denied");
    next(error);
  } catch (error) {
    next(error);
  }
};

module.exports = { checkReadAccess, checkWriteAccess };
