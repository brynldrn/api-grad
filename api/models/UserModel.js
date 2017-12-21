'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var SALT_WORK_FACTOR = 10;
//const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var UserSchema = new Schema({
    user_id: {
        type: String,
        required: 'Please use a generated UID'
    },
    username: {
        type: String,
        required: 'Please provide a unique username!',
        index: { unique: true }
    },
    password: {
        type: String,
        required: 'Please provide a password'
    },
    isAdmin: {
        type: Boolean,
        required: 'Please set privilege'
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
    
    // if user's password is still the same, just return the instance
    if (!user.isModified('password')) return next;

    // generate salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePW, cb) {
    bcrypt.compare(candidatePW, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.methods.encryptPassword = function (password) {
    if (!password) return '';
    return bcrypt.hashSync(password, SALT_WORK_FACTOR);
}

module.exports = mongoose.model('Users', UserSchema);