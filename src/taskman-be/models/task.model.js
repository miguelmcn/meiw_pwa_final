const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const taskSchema = new Schema({
    name: String,
    description: String,
    
    creationDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        default: Date.now
    },
    completionDate: {
        type: Date
    },
    status: String,
    assign:  [{
        type: String,
    }],
    labels: [{
        type: String,
    }],
    important: {
        type: Boolean,
        default: false
    },    
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.task, taskSchema);