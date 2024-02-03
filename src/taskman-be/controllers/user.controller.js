const User = require('../models/user.model');
const {
    validationResult
} = require('express-validator');
const UserMessages = require("../messages/user.messages");
const JWT = require("jsonwebtoken");
const CONFIG = require("../config/config");

exports.get = (req, res) => {

    User.find(
        { type: "user" },
        (error, users) => {
            if (error) throw error;

            let message = UserMessages.success.s2;

            if (users.length < 0)
                message = UserMessages.success.s5;

            message.body = users;
            return res.status(message.http).send(message);
        });

}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    User.findOne({
        _id: req.params.id
    }, (error, user) => {
        if (error) throw error;
        if (!user) return res.status(UserMessages.error.e1.http).send(UserMessages.error.e1);
        let message = UserMessages.success.s2;
        message.body = user;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    console.log(req.body);

    User.findOne({
        "auth.username": req.body.auth.username
    }, (error, user) => {        
        if (error) throw error;
        if (user) return res.status(UserMessages.error.e0.http).send(UserMessages.error.e0)

        new User({
            name: req.body.name,
            type: req.body.type,
            auth: {
                username: req.body.auth.username,
                password: req.body.auth.password
            }
        }).save((error, user) => {
            if (error) throw error;

            let payload = {
                pk: user.auth.public_key
            }

            let options = {
                expiresIn: CONFIG.auth.expiration_time,
                issuer: CONFIG.auth.issuer
            };

            let token = JWT.sign(payload, user.auth.private_key, options);


            let message = UserMessages.success.s0;
            message.body = user;
            return res.header("location", "/users/" + user._id).header("Authorization", token).status(message.http).send(message);
        })
    });
}