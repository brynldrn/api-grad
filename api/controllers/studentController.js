'use strict';

var mongoose = require('mongoose'),
    Student = mongoose.model('Students');

// Get all students
exports.students_list = function (request, response) {
    Student.find({}, function (error, task) {
        if(error) {
            response.send(error);
        }
        response.json(task);
    });
};

// Add a new student
exports.students_add = function (request, response) {
    var new_student = new Student(request.body);
    new_student.save(function (error, task) {
        if (error) {
            response.send(error);
        }
        response.json(task);
    });
};

// Get student by ID
exports.students_select = function (request, response) {
    Student.findOne({ _id: request.params.id }, function (error, task) {
        if (error) {
            response.send(error);
        }
        response.json(task);
    });
};

// Update student details
exports.students_update = function (request, response) {
    Student.findOneAndUpdate({_id: request.params.id}, request.body, {new: true}, function (error, task) {
        if (error) {
            response.send(error);
        }
        response.json(task);
    });
};

// Soft Delete Student
exports.students_remove = function (request, response) {
    Student.remove({ _id: request.params.id }, function (error, task) {
        if (error) {
            response.send(error);
        }
        response.json({message: 'Student removed'});
    });
};