const express = require('express');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');

class UsersController {

    static getAllUsers = (req, res) => {
        User.findAll().then(users => {
            res.render("admin/users/index", { users: users });
        })
    }

    static newUser = (req, res) => {
        res.render('admin/users/create')
    }

    static saveUser = (req, res) => {
        const { email, password } = req.body;

        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (user == undefined) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);

                User.create({
                    email: email,
                    password: hash
                }).then(() => {
                    res.redirect("/admin/users");
                }).catch((err) => {
                    res.redirect("/admin/users");
                })
            } else {
                res.redirect('/admin/users/new');
            }
        })

    }

    static login = (req, res) => {
        res.render("admin/users/login");
    }

    static authenticateLogin = (req, res) => {
        let { email, password } = req.body;

        User.findOne({ where: { email: email } })
            .then(user => {
                if (user != undefined) {
                    let correct = bcrypt.compareSync(password, user.password);
                    if (correct) {
                        req.session.user = {
                            id: user.id,
                            email: user.email
                        }
                        res.redirect('/admin');
                    } else {
                        res.redirect('/login');
                    }

                } else {
                    res.redirect("/login");
                }
            })

    }

    static logout = (req, res) => {
        req.session.user = undefined;
        res.redirect('/');
    }
}

module.exports = UsersController;