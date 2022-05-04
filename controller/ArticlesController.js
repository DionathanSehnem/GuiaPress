const express = require('express');
const Category = require('../models/Category.js');
const Article = require('../models/Article.js');
const slugify = require('slugify');

class ArticlesController {

    static getArticles = (req, res) => {
        res.send("Rota de ARTIGOS")
    }

    static newArticle = (req, res) => {
        Category.findAll({ raw: true })
            .then(categories =>
                res.render("admin/articles/new", { categories: categories }));

    }

    static saveArticle = (req, res) => {
        let { title, body, category } = req.body;

        Article.create({
            title: title,
            slug: slugify(title).toLowerCase(),
            body: body,
            categoryId: Number(category)
        }).then(() => {
            res.redirect("/admin/articles")
        })
    }

    static adminArticle = (req, res) => {
        Article.findAll({
                include: [{ model: Category }]
            })
            .then((articles) => {
                res.render('admin/articles/index', {
                    articles: articles
                });
            })
    }

    static deleteArticle = (req, res) => {
        let { id } = req.body;
        if (id != undefined || !isNaN(id)) {
            Article.destroy({ where: { id: id } })
                .then(() => {
                    res.redirect("/admin/articles")
                })
        } else {
            res.redirect("/admin/articles")
        }
    }

    static editArticle = (req, res) => {
        let { id } = req.params;
        Article.findByPk(id)
            .then((article) => {
                if (article != undefined) {
                    Category.findAll({ raw: true })
                        .then(categories =>
                            res.render("admin/articles/edit", {
                                categories: categories,
                                article: article.dataValues
                            }));
                } else {
                    res.redirect("/admin/articles")
                }
            })
            .catch((err) => {
                res.redirect("/admin/articles")
            })
    }

    static updateArticle = (req, res) => {
        let { id, title, body, category } = req.body;
        Article.update({
                title: title,
                slug: slugify(title).toLowerCase(),
                body: body,
                categoryId: Number(category)
            }, {
                where: {
                    id: id
                }
            })
            .then(() => {
                res.redirect("/admin/articles");
            })
    }

}

module.exports = ArticlesController;