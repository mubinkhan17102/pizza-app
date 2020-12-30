function cartController() {
    return {
        index(req, res) {
            res.render('customers/cart');
        },
        update(req, res) {
            const pizza = JSON.parse(req.body.pizza);
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            const cart = req.session.cart;
            if (!cart.items[pizza._id]) {
                cart.items[pizza._id] = pizza;
                cart.items[pizza._id].qty = 1;
                cart.totalQty += 1;
                cart.totalPrice += parseInt(pizza.price);
            } else {
                cart.items[pizza._id].qty += 1;
                cart.totalQty += 1;
                cart.totalPrice += parseInt(pizza.price);
            }
            const total = cart.totalQty;
            //console.log(cart);
            res.json({total})
        }
    }
}

module.exports = cartController;