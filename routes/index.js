const express = require('express');
const categories = require('./categoriesRoutes.js')
const articles = require('./articlesRoutes.js')
const Category = require('../models/Category.js');
const Article = require('../models/Article.js');



let routes = (app) => {
    app.get('/', (req, res) => {
        Article.findAll({
            order: [
                ['id', 'DESC']
            ]
        }).then((articles) => {
            res.render('index', { articles: articles });
        })
    })

    app.get('/:slug', (req, res) => {
        const { slug } = req.params;
        Article.findOne({
            where: {
                slug: slug
            }
        }).then((article) => {
            if (article != undefined) {
                res.render('article', { article: article });
            } else {
                res.redirect("/");
            }
        }).catch((err) => {
            res.redirect("/");
        })
    })

    app.use(
        express.json(),
        categories,
        articles
    )
}

module.exports = routes;