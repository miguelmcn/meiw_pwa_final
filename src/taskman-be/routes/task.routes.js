const express = require('express');
let router = express.Router();
const TaskController = require('../controllers/task.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, TaskController.get)
    .post(AuthController.checkAuth, [
        body('name').isString(),
        body('description').isString(),
        body('creationDate').isString(),
        body('dueDate').isString(),
        body('status').isString(),        
        body('assign.*').isString(),
        body('labels.*').isString(),
        body('important').isBoolean()
    ], TaskController.create);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], TaskController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], TaskController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], TaskController.delete);

module.exports = router;