var http = require('http');
var path = require('path');
var express = require('express');
var handlebars  = require('express-handlebars').create({defaultLayout: false});
var morgan = require('morgan');
var request = require('request');
var app = module.exports = express();
var api = require('./routes/api');
var router = express.Router();

// Configure app
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Setup middleware
app.use(morgan('combined'));
app.use(router);
app.use('/api/', api);
app.use(express.static(path.join(__dirname, 'public')));

// Setup routes
router.get('/', function (req, res, next) {
    // Fetch from mock API
    request('http://127.0.0.1:3000/api/products', function(error, response, body) {
        if (error) {
            return next(error);
        }
        res.render('index', {products: body});
    });
});

// Listen for incoming requestsv
http.createServer(app).listen(3000, function () {
    console.log('Listening for incoming requests at http://127.0.0.1:3000/')
});
