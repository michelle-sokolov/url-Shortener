const express = require('express');
const app = express();
const ShortUrl = require('./models/shortUrl');
const connectDB = require('./config/db');
// connect to DB
connectDB();

app.set('view engine', 'ejs')
// url parameters
app.use(express.urlencoded({ extended: false }))

// route set up
app.get('/', async (req, res) => {
    // gets all urls 
    const shortUrls = await ShortUrl.find()
    // send short URLs to views
    res.render('index', { shortUrls: shortUrls })
})
// POST request - create short URL
app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
})

app.listen(process.env.PORT || 5000);