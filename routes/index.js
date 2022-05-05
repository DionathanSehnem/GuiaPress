const express = require('express');
const categories = require('./categoriesRoutes.js')
const articles = require('./articlesRoutes.js')
const Category = require('../models/Category.js');
const Article = require('../models/Article.js');



let routes = (app) => {
    app.get('/', (req, res) => {
        Article.findAll().then((articles) => {
            res.render('index', { articles: articles });
        })
    })

    app.use(
        express.json(),
        categories,
        articles
    )
}

module.exports = routes;