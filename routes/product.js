var config = require('../config/config')
var _ = require('lodash');

// Mock API using fixture so we're not dependent on network connectivity
var allProducts = require(config.ROOT +'/fixtures/products.json').data;


var routes = {
    init: function(app) {

        // get product specific details
        app.get('/api/product/:id', function (req, res, next) {
            
            var requestedId = Number(req.params.id);
            var productObj = _.find(allProducts, {'id': requestedId });

            var body;

            if (productObj) {
                body = {
                    id: productObj.id,
                    name: productObj.name.en,
                    price: '£' + productObj.price.gross / productObj.price.divisor,
                    designer: productObj.brand.name.en,
                    onSale : productObj.onSale,
                    sizes: productObj.saleableStandardSizes,
                    badges: productObj.badges,
                    images: {
                        outfit: '//cache.net-a-porter.com/images/products/'+productObj.id+'/'+productObj.id+'_ou_sl.jpg',
                        small: '//cache.net-a-porter.com/images/products/'+productObj.id+'/'+productObj.id+'_in_sl.jpg',
                        large: '//cache.net-a-porter.com/images/products/'+productObj.id+'/'+productObj.id+'_in_pp.jpg'
                    }
                };
            } else {
                body = {error: 'pid not found'}
            };

            res.json(body);
        });

    }
};



module.exports = {
    routes: routes
};