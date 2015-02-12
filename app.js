// config
var config = require(__dirname + '/config/config'),
	setUpRoutes = require(config.ROOT + '/routes/setup-routes').configureRoutes;

// Require our libraries
var expressUtilities = require(config.ROOT + '/utilities/express');

/********* Express Configuration *******/
var app = expressUtilities.appConfiguration.init();

/********* Set up routes *******/
setUpRoutes.init(app);

app.listen(config.PORT);
console.log('Service started on port ' + config.PORT );

