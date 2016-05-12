var assert = require('chai').assert;
var request = require("request");
var app = require('../app.js');
var cheerio = require('cheerio');

var base_url = "http://localhost:3000/";
var false_url = base_url + "/page/doesnt/exist";

// GET Request Tests
describe("GET /", function() {
  it("returns status code 200", function(done) {
    request.get(base_url, function(error, response, body) {
        assert.equal(200, response.statusCode);
        done();
    });
  });
  it("renders 60 product items", function(done) {
    request.get(base_url, function(error, response, body) {
        var $ = cheerio.load(body);
        var productCount = $('.product-list-container').children().length;
        assert.equal(60, productCount);
        done();
    });
  });
  it("renders 60 more items", function(done) {
    request.get(base_url + "3", function(error, response, body) {
        var $ = cheerio.load(body);
        var productCount = $('.product-list-container').children().length;
        assert.equal(60, productCount);
        done();
    });
  });
  it("renders 9 pagination buttons", function(done) {
    request.get(base_url, function(error, response, body) {
        var $ = cheerio.load(body);
        var productCount = $('.pagination').children().length;
        assert.equal(9, productCount);
        done();
    });
  });

});

// GET 404 Test
describe("GET 404", function() {
  it("returns status code 404", function(done){
    request.get(false_url, function(error, response, body){
        assert.equal(404, response.statusCode);
        done();
    });
  });
});
