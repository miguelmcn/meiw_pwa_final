const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const taskSchema = new Schema({
    name: String,

    users: [{
        type: String,
        ref: CONFIG.mongodb.collections.user
    }]
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.group, taskSchema);