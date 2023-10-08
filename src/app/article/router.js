const express = require("express");
const {
  createArticle,
  getAllArticles,
  getArticleById,
  deleteArticle,
  updateArticle,
  publishArticle,
  getPublishedArticles,
} = require("./controller");

const { checkWriteAccess, checkReadAccess } = require("../common/middlewares");
const articleRouter = express.Router();

articleRouter.get("/publish", checkReadAccess, getPublishedArticles);
articleRouter.patch("/publish/:id", checkWriteAccess, publishArticle);
articleRouter.post("/", checkWriteAccess, createArticle);
articleRouter.get("/", checkReadAccess, getAllArticles);
articleRouter.get("/:id", checkReadAccess, getArticleById);
articleRouter.delete("/:id", checkWriteAccess, deleteArticle);
articleRouter.patch("/:id", checkWriteAccess, updateArticle);

module.exports = { articleRouter };
