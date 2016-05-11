// config
var config = require('../config/config.js');

var express = require("express");
var hbs = require('express-hbs');
var expressParams = require('express-params');

var sassMiddleware = require('node-sass-middleware');
var serveStatic = require('serve-static');

var appConfiguration = {

    templateConfig: function(app) {

        app.engine('hbs', hbs.express3({
          partialsDir: config.ROOT + '/views/partials',
          layoutsDir: config.ROOT + '/views/layouts'
        }));
        app.set('view engine', 'hbs');
        app.set('views', config.ROOT + '/views');

        app.use(sassMiddleware({
          src: config.ROOT + '/stylesheets',
          dest: config.ROOT,
          force: true,
          outputStyle: 'compressed',
          prefix: '/styles'
        }));

        app.use(express.static(config.ROOT + '/public'));
    },


    init: function() {
        var app = express();

        appConfiguration.templateConfig(app);

        return app;
    }
};


module.exports = {
    appConfiguration: appConfiguration
};
