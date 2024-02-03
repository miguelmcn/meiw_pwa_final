const express = require('express');
let router = express.Router();
const UserController = require('../controllers/user.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, UserController.get);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], UserController.getOne)

router.route('/')
    .post([body('name').isString(),
        body('type').isAlpha(),
        body('auth.username').isAlphanumeric(),
        body('auth.password').isString(),
        sanitizeBody('name').whitelist(CONFIG.sanitize.alphabet)
    ], UserController.create)
    .get(AuthController.checkAuth, UserController.get);

module.exports = router;