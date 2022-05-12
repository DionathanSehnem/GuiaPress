const express = require('express');
const CategoriesController = require('../controller/CategoriesController');
const adminAuth = require('../middlewares/adminAuth.js');
const router = express.Router();

router
    .get("/categorias", CategoriesController.getCategories)
    .post("/categories/save", CategoriesController.saveCategory)
    .post("/categories/delete", CategoriesController.deleteCategory)
    .post("/categories/update", CategoriesController.updateCategory)
    .get("/admin/categories/new", adminAuth, CategoriesController.newCategory)
    .get("/admin/categories", adminAuth, CategoriesController.adminCategories)
    .get("/admin/categories/edit/:id", adminAuth, CategoriesController.editCategory)

module.exports = router;