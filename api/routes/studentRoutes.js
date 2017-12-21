'use strict';
module.exports = function (app) {
    var student = require('../controllers/studentController');
    var user = require('../controllers/userController');

    // Student CRUD Routes

    app.route('/api/v1/students')
        .get(student.students_list)
        .post(student.students_add);

    app.route('/api/v1/students/:id')
        .get(student.students_select)
        .put(student.students_update)
        .delete(student.students_remove);

};