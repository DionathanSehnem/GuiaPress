const express = require('express');
const UserController = require('../controller/UsersController.js');
const adminAuth = require('../middlewares/adminAuth.js');
const router = express.Router();

router
    .get('/admin/users', adminAuth, UserController.getAllUsers)
    .get('/admin/users/new', adminAuth, UserController.newUser)
    .post('/users/create', UserController.saveUser)
    .get('/login', UserController.login)
    .get('/logout', UserController.logout)
    .post('/authenticate', UserController.authenticateLogin)

module.exports = router;