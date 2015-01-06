var express = require('express');
var router = module.exports = express.Router();

// Mock API using fixture so we're not dependent on network connectivity
var allProducts = require('../fixtures/products.json').data;

router.get('/products/', function (req, res, next) {
    var total = allProducts.length;
    var offset = parseInt(req.query.offset) || 0;
    var limit = parseInt(req.query.limit) || 60;
    if (offset > total) {
        return res.type('json').sendStatus(400);
    }

    res.json({
        offset: offset,
        limit: limit,
        total: total,
        data: allProducts.slice(offset, offset+limit).map(function(product) {
            // Simplify payload - more data available in fixture
            return {
                id: product.id,
                name: product.name.en,
                price: '£' + product.price.gross / product.price.divisor,
                designer: product.brand.name.en,
                image: {
                    outfit: '//cache.net-a-porter.com/images/products/'+product.id+'/'+product.id+'_ou_sl.jpg',
                    small: '//cache.net-a-porter.com/images/products/'+product.id+'/'+product.id+'_in_sl.jpg',
                    large: '//cache.net-a-porter.com/images/products/'+product.id+'/'+product.id+'_in_pp.jpg'
                }
            }
        })
    });
});
