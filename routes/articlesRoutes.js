const express = require('express');
const ArticlesController = require('../controller/ArticlesController');
const router = express.Router();

router
    .get("/articles", ArticlesController.getArticles)
    .post("/articles/save", ArticlesController.saveArticle)
    .get("/admin/articles", ArticlesController.adminArticle)
    .get("/admin/articles/new", ArticlesController.newArticle)
    .post("/admin/articles/delete", ArticlesController.deleteArticle)
    .get("/admin/articles/edit/:id", ArticlesController.editArticle)
    .post("/admin/articles/update", ArticlesController.updateArticle)

module.exports = router;