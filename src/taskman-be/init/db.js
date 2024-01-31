module.exports = (app, callback) => {
    const CONFIG = require('../config/config');
    const mongoose = require('mongoose');
    let settings = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    };
    global.mongoConnection = mongoose.createConnection(CONFIG.mongodb.uri, settings, (error) => {
        if (error) throw error;
        console.log('---Connected to DB');
        return callback();
    })

}