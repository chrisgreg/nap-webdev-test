'use strict'

var config = require('../config/config')
var request = require('request-promise');

const PRODUCT_ENDPOINT = (limit, offset) => { return `http://127.0.0.1:3000/api/products?limit=${limit}&offset=${offset}` }

var routes = {
    init: function(app) {

        // set up listing page
        app.get('/', function (req, res, next) {

            let pageDetails = {
               metadata: {
                   title: 'NAP Tech Test'
               },
               title: 'NAP Tech Test',
               layout: 'layouts/default',
               template: 'index'
            }

            request(PRODUCT_ENDPOINT(60, 0))
              .then((value) => {
                pageDetails.products = JSON.parse(value).data;
                res.render('index', pageDetails);
              })
              .catch((error) =>
                res.render('error', { error })
              );

        });

    }
};



module.exports = {
    routes: routes
};
