const homeController = require('../app/controllers/homeController');
const authController = require('../app/controllers/authController');
const cartController = require('../app/controllers/customer/cartController');
const auth = require('../app/middlewers/guest');
const passport = require('passport');

function webRouter(app) {
    app.get('/', homeController().index);
    app.get('/login',auth, authController().login);
    app.post('/login', authController().postLogin);
    app.post('/register', authController().postRegister);
    app.get('/register', auth, authController().register);
    app.get('/logout', authController().logout);

    //add to cart funtionality
    app.get('/cart', cartController().index);
    app.post('/updatepizza', cartController().update);
}

module.exports = webRouter;