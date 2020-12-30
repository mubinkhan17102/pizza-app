const menuModel = require('../models/Menu');
function homeController() {
    return {
        async index(req, res) {
            const pizzas = await menuModel.find();
            res.render('home',{pizzas:pizzas});
        }
    }
}

module.exports = homeController;