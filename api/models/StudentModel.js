'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
    student_id: {
        type: String,
        required: 'Please provide a School-issued ID'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    first_name: {
        type: String,
        required: 'Please provide a First Name'
    },
    last_name: {
        type: String,
        required: 'Please provide a Last name'
    },
    birthdate: {
        type: Date,
        required: 'Please provide birthdate'
    },
    gender: {
        type: String,
        required: 'Please select a Gender'
    },
    year_level: {
        type: String,
        required: 'Please select a Year Level'
    },
    status: {
        type: [{
            type: String,
            enum: ['active', 'dropped']
        }],
        default: ['active']
    }
});

module.exports = mongoose.model('Students', StudentSchema);