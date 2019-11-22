const User = require('../models/user');

exports.addUserController = (req, res, next) => {
    res.render('add-user', {
        pageTitle: 'Add new user'
    });
};

exports.postUserController = (req, res, next) => {
    const user = new User(req.body);
    user.save();
    res.redirect('/');
};

exports.getAllUsersController = (req, res, next) => {
    User.fetchUsers()
        .then(users => {
            res.render('users-list', {
                pageTitle: 'Users list',
                usersList: users
            });
        })
        .catch(error => {
            console.log(error);
        })
};

exports.getSingleUser = (req, res, next) => {
    User.fetchSingleUser(req.params.id)
        .then(user => {
            console.log(user);
            res.render('single-user', {
                pageTitle: req.body.username,
                user: user
            })
        })
        .catch(error => {
            console.log(error);
        })
};
