const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/User');
const { compare} = require('bcrypt');

function init(passport) {
    passport.use(new LocalStrategy(
        {
            usernameField:'email'
        },
        async (email, password, done) => {
            const user = await User.findOne({ email: email });
            if (!user) {
                return done(null, false, {message:'Invalid email'})
            } else {
                compare(password, user.password)
                    .then(match => {
                        if (match) {
                            return done(null, user, {message:'Loged in successful'})
                        }
                        console.log(password);
                        return done(null, false, { message: 'Invalid credentials' });
                    })
                    .catch(err => {
                        console.log(err);
                        return done(null, false, {message:'Soemthing went wrong'})
                    })
            }
        }
    ))
    passport.serializeUser((user, done) => {
        done(null, user._id);
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    })
}

module.exports = init;