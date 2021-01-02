const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

function authController() {
    return {
        login(req, res) {
            res.render('auth/login');
        },
        register(req, res) {
            res.render('auth/register');
        },
        async postRegister(req, res) {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                req.flash('error', 'Please fill all field');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('register');
            }
            try {
                const checkUser = await UserModel.findOne({ email });
                if (!checkUser) {
                    const user = new UserModel({
                        name,
                        email,
                        password
                    });
                    user.password = await bcrypt.hash(password, 10);
                    const data = await user.save();
                    if (data) {
                        req.flash('msg', 'Success, Log in here now.');
                        res.redirect('/login');
                    }
                } else {
                    req.flash('error', 'Email already registered');
                    req.flash('name', name);
                    req.flash('email', email);
                    res.redirect('register')
                }
            } catch (err) {
                throw err;
            }
        },
        postLogin(req, res,next) {
            passport.authenticate('local', function(err, user, info) {
                if (err) {
                    req.flash('err', info.message);
                    return next(err);
                }
                if (!user) {
                    req.flash('err', info.message);
                    return res.redirect('/login');
                }
                req.logIn(user, function(err) {
                    if (err) {
                        req.flash('err', info.message);
                        return next(err);
                    }
                    return res.redirect('/');
                });
            })(req, res, next);
        },
        logout(req, res) {
            req.logout();
            res.redirect('/');
        }
    }
}

module.exports = authController;