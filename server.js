const app = require('express')();
const path = require('path');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');

app.get('/', (req, res) => {
    res.render('test');
})

app.use(expressLayout);
app.set('views', path.join(__dirname, '/resource/views'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server starts on port ${PORT}`);
})