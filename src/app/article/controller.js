const { v4: uuidv4 } = require("uuid");
const { executeQuery } = require("../../db/dbUtils");
const httpStatus = require("http-status");

const createArticle = async (req, res, next) => {
  try {
    const { title, content, userId } = req.body;
    const articleId = uuidv4();
    await executeQuery(
      `INSERT INTO articles (id, title, content, author_id) VALUES (?, ?, ?, ?);`,
      [articleId, title, content, userId]
    );
    return res.status(httpStatus.OK).json({
      message: "created article successfully",
      data: {
        article: {
          id: articleId,
          title,
          content,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllArticles = async (req, res, next) => {
  try {
    const result = await executeQuery(`SELECT * FROM articles;`);
    return res.status(httpStatus.OK).json({
      data: {
        articles: result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getArticleById = async (req, res, next) => {
  try {
    const articleId = req.params.id;
    const result = await executeQuery(`SELECT * FROM articles where id = ?;`, [
      articleId,
    ]);
    return res.status(httpStatus.OK).json({
      data: {
        article: result[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const articleId = req.params.id;
    await executeQuery(`DELETE FROM articles where id = ?;`, [articleId]);
    return res.status(httpStatus.OK).json({
      message: "deleted article successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateArticle = async (req, res, next) => {
  try {
    const articleId = req.params.id;
    const { title, content } = req.body;

    let params = [];
    if (title !== undefined) params.push(title);
    if (content !== undefined) params.push(content);
    params.push(articleId);

    await executeQuery(
      `UPDATE 
        articles 
       SET 
        ${title ? "title = ?" : ""}
        ${content ? ", content = ?" : ""}
       WHERE id = ?;`,
      params
    );
    return res.status(httpStatus.OK).json({
      message: "updated article successfully",
    });
  } catch (error) {
    next(error);
  }
};

const publishArticle = async (req, res, next) => {
  try {
    const articleId = req.params.id;
    await executeQuery(`UPDATE articles SET is_drafted = 1 WHERE id = ?;`, [
      articleId,
    ]);
    return res.status(httpStatus.OK).json({
      message: "published article successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getPublishedArticles = async (req, res, next) => {
  try {
    const result = await executeQuery(
      `SELECT * FROM articles WHERE is_drafted = 1;`
    );

    return res.status(httpStatus.OK).json({
      data: {
        articles: result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  deleteArticle,
  updateArticle,
  publishArticle,
  getPublishedArticles,
};
