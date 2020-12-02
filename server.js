const express = require('express')
const app = express()
const connectDB = require('./config/db');
// connect to DB
connectDB();

app.set('view engine', 'ejs')

// route set up
app.get('/', async (req, res) => {
    res.render('index')
})
// POST request
app.post('/shortUrls', (req, res) => {

})

app.listen(process.env.PORT || 5000);