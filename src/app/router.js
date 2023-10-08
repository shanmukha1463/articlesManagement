const express = require("express");
const mainRouter = express.Router();

const { userRouter } = require("./user/router.js");
const { articleRouter } = require("./article/router.js");
const { errorHandler } = require("./common/errorHandler.js");

mainRouter.use("/user", userRouter);
mainRouter.use("/article", articleRouter);

mainRouter.use(errorHandler)

module.exports = { mainRouter };
