const express = require('express');
let router = express.Router();
const GroupController = require('../controllers/group.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, GroupController.get)
    .post(AuthController.checkAuth, [
        body('name').isAlphanumeric()
    ], GroupController.create);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], GroupController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], GroupController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], GroupController.delete);

module.exports = router;