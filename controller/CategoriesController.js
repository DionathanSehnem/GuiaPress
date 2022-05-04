const express = require('express');
const slugify = require('slugify');
const Category = require('../models/Category.js');

class CategoriesController {

    static getCategories = (req, res) => {
        res.send("Rota de CATEGORIAS")
    }

    static newCategory = (req, res) => {
        res.render("admin/categories/new");
    }

    static saveCategory = (req, res) => {
        let { title } = req.body;
        if (title != undefined) {
            Category.create({
                title: title,
                slug: slugify(title).toLowerCase()
            }).then(() => {
                res.redirect('/admin/categories/');
            })
        } else {
            res.redirect('/admin/categories/new')
        }
    }

    static adminCategories = (req, res) => {
        Category.findAll({ raw: true })
            .then((categories) => {
                res.render('admin/categories/index', {
                    categories: categories
                });
            })
    }

    static editCategory = (req, res) => {
        let { id } = req.params;
        if (isNaN(id)) {
            res.redirect("/admin/categories");
        }
        Category.findByPk(id)
            .then((category) => {
                if (category != undefined) {
                    console.log();
                    res.render("admin/categories/edit", {
                        category: category.dataValues
                    })
                } else {
                    res.redirect("/admin/categories");
                }
            })
            .catch((err) => {
                res.redirect("/admin/categories");
            })
    }

    static deleteCategory = (req, res) => {
        let { id } = req.body;
        if (id != undefined || !isNaN(id)) {
            Category.destroy({ where: { id: id } })
                .then(() => {
                    res.redirect("/admin/categories")
                })
        } else {
            res.redirect("/admin/categories")
        }
    }

    static updateCategory = (req, res) => {
        let { id, title } = req.body;
        Category.update({ title: title, slug: slugify(title).toLowerCase() }, {
                where: {
                    id: id
                }
            })
            .then(() => {
                res.redirect("/admin/categories");
            })
    }

}

module.exports = CategoriesController;