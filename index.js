const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.port || 4444;

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

app.listen(PORT, () => { console.log(`Port is running on port ${PORT}`)});
