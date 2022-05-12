const express = require('express');
const ArticlesController = require('../controller/ArticlesController');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuth.js');

router
    .get("/articles", ArticlesController.getArticles)
    .post("/articles/save", ArticlesController.saveArticle)
    .get("/admin/articles", adminAuth, ArticlesController.adminArticle)
    .get("/admin/articles/new", adminAuth, ArticlesController.newArticle)
    .post("/admin/articles/delete", adminAuth, ArticlesController.deleteArticle)
    .get("/admin/articles/edit/:id", adminAuth, ArticlesController.editArticle)
    .post("/admin/articles/update", adminAuth, ArticlesController.updateArticle)


module.exports = router;