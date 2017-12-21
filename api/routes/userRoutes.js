'use strict';
module.exports = function (app) {
    var user = require('../controllers/userController');
    // User Routes

    app.route('/api/v1/users/auth')
        .post(user.users_auth);

    app.route('/api/v1/users')
        .post(user.users_add)
        .get(user.users_list);

    app.route('/api/v1/users/:id')
        .get(user.users_find)
        //.put(user.users_update)
        .delete(user.users_remove);

};