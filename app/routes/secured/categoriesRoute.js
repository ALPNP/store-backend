var express = require('express');
var categoriesRouter = express.Router();
var categoriesController = require('./../../controllers/categoriesController');

categoriesRouter.get('/categories', function (req, res) {
    categoriesController.getCategories(req, res);
});

categoriesRouter.post('/categories', function (req, res) {
    categoriesController.addCategory(req, res);
});

module.exports = categoriesRouter;
