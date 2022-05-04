const express = require('express');
const CategoriesController = require('../controller/CategoriesController');

const router = express.Router();

router
    .get("/categorias", CategoriesController.getCategories)
    .post("/categories/save", CategoriesController.saveCategory)
    .post("/categories/delete", CategoriesController.deleteCategory)
    .post("/categories/update", CategoriesController.updateCategory)
    .get("/admin/categories/new", CategoriesController.newCategory)
    .get("/admin/categories", CategoriesController.adminCategories)
    .get("/admin/categories/edit/:id", CategoriesController.editCategory)

module.exports = router;