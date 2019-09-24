const express = require('express');
const path = require('path');
const router = express.Router();
const userRoutes = require('./user-routes');

router.get('/', (req, res, next) => {
    res.render('index', {
        pageTitle: 'Index page'
    });
});

module.exports = router;
