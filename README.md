# NAP Tech Web Dev Test

This is a chance for you to show us how you think we should be displaying our product catalog.

## Task

* Build a dynamic product listing page using the product API

###You should include 
 
* Implement pagination/infinite scroll
* Include Filters and sorts (eg. lowest price first, select a size)
* A mix of server and clientside rendering
* It should be device agnostic

### Things to note

* Aesthetics are very important to the Net-a-porter brand but so is performance
* Don't worry about header/footer
* Use any library/framework you deem applicable

The following are examples of the existing mobile and desktop listing pages:

* [Mobile](public/mobile.jpg)
* [Desktop](public/desktop.jpg)

You can replicate these or if you think there is something we should be doing, or it should work another way - feel free to be creative but tell us why and what you think we are doing wrong.


## Setup

To run the app:

```shell
$ npm install
$ node app
```

## Products API

Returns a list of products. 

Example:

```
GET /products/?offset=0&limit=60
HTTP 200
Content-Type: application/json

{
    "offset": 0,
    "limit": 60,
    "total": 274,
    "data": [{
        "id": 540559,
        "name": "Roadmaster Waxed-Cotton Jacket",
        "price": "£550",
        "designer": "Belstaff",
        "image": {
            outfit: "//cache.net-a-porter.com/images/products/543002/543002_ou_sl.jpg",
            small: "//cache.net-a-porter.com/images/products/543002/543002_in_sl.jpg",
            large: "//cache.net-a-porter.com/images/products/543002/543002_in_pp.jpg"
        }
    }, ...]
}
```

Parameters:

* `offset` (optional) - defaults to 0
* `limit` (optional) - defaults to 60
