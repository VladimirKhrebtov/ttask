const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dbConnection = require('./utils/database');
const app = express();
const PORT = process.env.PORT || 5555;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const taskRoutes = require('./routes/task-routes');
const indexRoutes = require('./routes/index-routes');
const userRoutes = require('./routes/user-routes');

app.use(userRoutes.router);
app.use(taskRoutes.router);
app.use(indexRoutes);

app.get('/page-not-found', (req, res, next) => {
    res.render('404', {
        pageTitle: 'Page Not Found'
    });
});

app.use('/', (req, res, next) => {
    res.redirect('/page-not-found');
});
app.listen(PORT, '0.0.0.0', () => { console.log(`Server is running on port ${PORT}`)});
dbConnection.dbConnection();
