'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('Users');
var jwt = require('jsonwebtoken');


exports.users_list = function (req, res) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token) {
        jwt.verify(token, 'tomriddle', function (err, decoded) {
            if (err) res.json({message: 'Invalid token!'})
            req.decoded = decoded;
            User.find({}, function (error, task) {
                if (error) {
                    res.send(error);
                }
                res.json(task);
            });
        })
    } else {
        res.json({message: 'No Token Provided!'});
    }
}

exports.users_add = function (req, res) {
    var currUser = new User(req.body);
    currUser.save(function (err, task) {
        if (err) {
            res.send(err);
        } else {
            res.json(task);
        }
    });
}

exports.users_find = function (req, res) {
    User.findById({ _id: req.params.id }, function (err, task) {
        if (err) {
            res.send(err)
        } else {
            res.json(task);
        }
    });
}

exports.users_auth = function (req, res) {
    User.findOne({username: req.body.username}, function (err, user) {
        if (err) res.send(err);
        if (!user) res.json({message: 'User not found'});
        if (user) {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (!isMatch) {
                    res.json({message: 'Invalid password!'});
                } else {
                    var token = jwt.sign({
                        _id: user._id,
                        user_id: user.user_id,
                        username: user.username,
                        password: user.password,
                        isAdmin: user.isAdmin
                    }, 'tomriddle');

                    res.json({ success: true, message: 'User Authenticated', token: token });
                }
            });
        }
    });
}

// exports.users_update = function (req, res) {
//         User.findById({_id: req.params.id}, function (err, user) {
//             if (err) res.send(err);
//             user.password = user.encryptPassword(user.password);
//             user.save();
//             res.json(user);
//         });
//     // User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, task) {
//     //     if (err) {
//     //         res.send(err);
//     //     }
//     //     res.json(task);
//     // });
// }

exports.users_remove = function (req, res) {
    User.remove({ _id: req.params.id }, function (err, task) {
        if (err) res.send(err);
        res.json({message : 'User removed'})
    })
}