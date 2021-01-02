require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo')(session);
const passport = require('passport');

mongoose.connect('mongodb://localhost/pizza', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Databse connected');
}).catch(err => {
    console.log('Err');
})
//Passport configaration

const mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection:'sessions'
});

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    store:mongoStore,
    saveUninitialized: true,
    cookie:{maxAge:1000*60*60*24}
}));

const passportInit = require('./config/passport');
passportInit(passport);
app.use(passport.initialize())
app.use(passport.session());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(flash());

app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
})

//Configure layouts and views
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resource/views'));
app.set('view engine', 'ejs');
require('./route/web')(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server starts on port ${PORT}`);
})