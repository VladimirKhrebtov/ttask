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
    User.fetchUsers((users) => {
        if (users.toString()) {
            res.render('users-list', {
                pageTitle: 'Users list',
                usersList: JSON.parse(users)
            });
        } else {
            res.render('users-list', {
                pageTitle: 'Users list',
                usersList: undefined
            });
        }
    })
};

exports.getSingleUser = (req, res, next) => {
    User.fetchSingleUser(req.params.id, user => {
        res.render('single-user', {
            pageTitle: req.body.username,
            user: user
        })
    })
};
