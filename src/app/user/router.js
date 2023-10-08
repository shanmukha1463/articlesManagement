const express = require("express");

const { createUser, getUser } = require("./contollers");
const userRouter = express.Router();

userRouter.get("/:id", getUser);
userRouter.post("/", createUser);

module.exports = { userRouter };
