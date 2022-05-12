const express = require('express');
const categories = require('./categoriesRoutes.js');
const articles = require('./articlesRoutes.js');
const users = require('./usersRoutes.js');
const Category = require('../models/Category.js');
const Article = require('../models/Article.js');
const adminAuth = require('../middlewares/adminAuth.js');

let routes = (app) => {

    app.use(
        express.json(),
        categories,
        articles,
        users
    )

    app.get('/', (req, res) => {
        Article.findAll({
            order: [
                ['id', 'DESC']
            ],
            limit: 4
        }).then(articles => {
            Category.findAll().then(categories => {
                res.render('index', {
                    articles: articles,
                    categories: categories
                });
            })
        })
    })

    app.get("/admin", adminAuth, (req, res) => {
        res.render("admin/index");
    })

    app.get("/leitura", (req, res) => {
        res.json({
            session: req.session,
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

    app.get('/article/page/:num', (req, res) => {
        const pageNumber = parseInt(req.params.num);
        let offset = 0;

        if (isNaN(pageNumber) || pageNumber == 1) {
            offset = 0;
        } else {
            offset = (pageNumber - 1) * 4;
        }

        Article.findAndCountAll({
            limit: 4,
            offset: offset,
            order: [
                ['id', 'DESC']
            ],
        }).then(articles => {
            let next;
            if (offset + 4 >= articles.count) {
                next = false;
            } else {
                next = true;
            }

            let result = {
                page: parseInt(pageNumber),
                next: next,
                articles: articles,
            }

            Category.findAll().then(categories => {
                res.render('admin/articles/page', {
                    result: result,
                    categories: categories
                })
            })
        })
    })
}

module.exports = routes;