const Group = require('../models/group.model');
const {
    validationResult
} = require('express-validator');
const GroupMessages = require("../messages/group.messages");

exports.get = (req, res) => {

    Group.find(req.query).populate("users", "name").exec((error, groups) => {
        if (error) throw error;

        let message = GroupMessages.success.s2;

        if (groups.length < 0)
            message = GroupMessages.success.s5;

        message.body = groups;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Group({
        name: req.body.name,
        users: req.body.users
    }).save((error, group) => {
        if (error) throw error;
        let message = GroupMessages.success.s0;
        message.body = group;
        return res.header("location", "/groups/" + group._id).status(message.http).send(message);
    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Group.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, group) => {
        if (error) throw error;
        if (!group) return res.status(GroupMessages.error.e0.http).send(GroupMessages.error.e0);

        let message = GroupMessages.success.s1;
        message.body = group;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Group.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(GroupMessages.error.e0.http).send(GroupMessages.error.e0);
        return res.status(GroupMessages.success.s3.http).send(GroupMessages.success.s3);

    });
}

exports.getOne = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Group.findOne({
        _id: req.params.id
    }).exec((error, group) => {
        if (error) throw error;
        if (!group) return res.status(GroupMessages.error.e0.http).send(GroupMessages.error.e0);
        let message = GroupMessages.success.s2;
        message.body = group;
        return res.status(message.http).send(message);
    });

}
