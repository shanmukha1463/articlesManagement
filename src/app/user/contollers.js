const httpStatus = require("http-status");
const { executeQuery } = require("../../db/dbUtils");
const { v4: uuidv4 } = require("uuid");
const { getRoleId } = require("./utils");

const createUser = async (req, res, next) => {
  try {
    const userId = uuidv4();
    const { name, role } = req.body;
    const roleId = await getRoleId(role);
    await executeQuery(
      `INSERT INTO users (id, username, role_id) VALUES (?, ?, ?);`,
      [userId, name, roleId]
    );
    return res.status(httpStatus.OK).json({
      message: "created user successfully",
      data: {
        user: { id: userId, name: name },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const result = await executeQuery(`SELECT * FROM users where id = ?;`, [
      userId,
    ]);
    return res.status(httpStatus.OK).json({
      data: {
        user: result[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, getUser };
