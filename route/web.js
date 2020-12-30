const homeController = require('../app/controllers/homeController');
const authController = require('../app/controllers/authController');
const cartController = require('../app/controllers/customer/cartController');

function webRouter(app) {
    app.get('/', homeController().index);
    app.get('/login', authController().login);
    app.get('/register', authController().register);

    //add to cart funtionality
    app.get('/cart', cartController().index);
    app.post('/updatepizza', cartController().update);
}

module.exports = webRouter;