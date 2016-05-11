'use strict'

var config = require('../config/config')
var request = require('request-promise');

const PRODUCT_ENDPOINT = (limit, offset) => {
  return `http://127.0.0.1:3000/api/products?limit=${limit}&offset=${offset}`
}

var routes = {
    init: function(app) {

        // set up listing page
        app.get('/:page?', function (req, res, next) {

            let limit = 60;
            let page = req.params.page || 1;
            let offset = (page * limit) - limit;

            let pageDetails = {
               metadata: {
                   title: 'NAP Tech Test'
               },
               title: 'NAP Tech Test',
               layout: 'layouts/default',
               template: 'index'
            }

            request(PRODUCT_ENDPOINT(limit, offset))
              .then((value) => {
                const payload = JSON.parse(value);
                const numberOfPages = Math.ceil(payload.total/limit);
                const pagination = Array.apply(null, Array(numberOfPages))
                                    .map((x,i) => { return i + 1; });

                pageDetails.products = payload.data;
                pageDetails.pageNumber = pagination;

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
