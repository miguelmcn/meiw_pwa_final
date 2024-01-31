const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    name: String,
    type: String,
    auth: {
        username: {
            type: String,
            unique: true
        },
        password: String,
        public_key: String,
        private_key: String
    }
});

userSchema
    .pre("save", function (callback) {

        this.auth.public_key = Math.random().toString(36).substring(2) + this._id;
        this.auth.private_key = Math.random().toString(36).substring(2) + this._id;

        this.auth.password = bcrypt.hashSync(escape(this.auth.password), bcrypt.genSaltSync(2));

        callback();
    })

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.user, userSchema);