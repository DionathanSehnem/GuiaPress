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
        }).then(articles => {
            Category.findAll().then(categories => {
                res.render('index', {
                    articles: articles,
                    categories: categories
                });
            })
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
                Category.findAll().then(categories => {
                    res.render('article', {
                        article: article,
                        categories: categories
                    });
                })
            } else {
                res.redirect("/");
            }
        }).catch((err) => {
            res.redirect("/");
        })
    })

    app.get('/category/:slug', (req, res) => {
        const { slug } = req.params;
        console.log("dsahdkashdlkashdlkjashdlkashdask\n\n\n\n" + slug)
        Category.findOne({
            where: {
                slug: slug
            },
            include: [{ model: Article }]
        }).then((category) => {
            if (category != undefined) {
                Category.findAll().then(categories => {
                    res.render('category', {
                        articles: category.articles,
                        categories: categories
                    });
                })
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