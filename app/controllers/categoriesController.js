var Category = require('./../models/category');
var ServerResponse = require('./../classes/ServerResponse');

var categoriesController = {
    sr: new ServerResponse(),
    addCategory: function (req, res) {
        var ctx = this;

        if (req.body.name && req.body.name.length > 0) {
            var category = new Category({
                name: req.body.name,
                parentId: req.body.parentId
            });

            category.save(function (err) {
                if (err) {
                    return res.json(ctx.sr.setRes(false, 'Server error', 1, err).send());
                }

                return res.json(ctx.sr.setRes(true, 'Category saved', 2, category).send());
            });
        } else {
            return res.json(ctx.sr.setRes(false, 'A category without a name', 3).send());
        }
    },
    getCategories: function (req, res) {
        var ctx = this;

        Category.find().exec(function (err, categories) {
            if (err) {
                return res.json(ctx.sr.setRes(false, 'Categories error', 4, err).send());
            }

            res.json(ctx.sr.setRes(true, 'Find ' + categories.length, 5, categories));
        });
    }
};

module.exports = categoriesController;
