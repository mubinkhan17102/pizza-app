const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');

app.use(express.static('public'));
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resource/views'));
app.set('view engine', 'ejs');
require('./route/web')(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server starts on port ${PORT}`);
})