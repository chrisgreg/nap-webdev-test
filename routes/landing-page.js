'use strict'

var config = require('../config/config')
var request = require('request-promise');

// Caching
var NodeCache = require('node-cache');
var cache = new NodeCache();

// Logging
var winston = require('winston');
var logging = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({'timestamp':true})
    ]
});

const ONE_DAY = 86400000;
const PAYLOAD_CACHE_KEY = (page) => { return `${page} payload` }
const PRODUCT_ENDPOINT = (limit, offset) => {
  return `http://127.0.0.1:3000/api/products?limit=${limit}&offset=${offset}`
}

var routes = {
    init: function(app) {

        // Set up listing page
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
               template: 'index',
               currentPage: page
            }

            // Use Cache if it exists
            const cachedContent = cache.get(PAYLOAD_CACHE_KEY(page));

            if (cachedContent) {
              renderCached();
            } else {
              renderUncached();
            }

            function renderCached(){
              logging.info(`${req.connection.remoteAddress}: Using cache for Page ${page}`);

              setupPageData(cachedContent);
              res.render('index', pageDetails);
            }

            function renderUncached(){
              request(PRODUCT_ENDPOINT(limit, offset))
                .then((value) => {
                  logging.info(`${req.connection.remoteAddress}: Uncached request for Page ${page}`);

                  const payload = JSON.parse(value);
                  setupPageData(payload);
                  res.render('index', pageDetails);
                })
                .catch((error) => {
                  logging.error(`${req.connection.remoteAddress}: ${error}`);
                  res.status(500).render('error', { error });
                });
            }

            // Populate Page Data
            function setupPageData(payload){
              const numberOfPages = Math.ceil(payload.total/limit);
              const pagination = Array.apply(null, Array(numberOfPages))
                                  .map((x,i) => { return i + 1; });

              cache.set(PAYLOAD_CACHE_KEY(page), payload, ONE_DAY);

              pageDetails.products = payload.data;
              pageDetails.pageNumber = pagination;
            }

        });

    }
};

module.exports = {
    routes: routes
};
