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
// get short url code
app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    // if URL submitted is invalid
    if (shortUrl == null) return res.sendStatus(404)
    shortUrl.save()
    // use long url to redirect user with short code
    res.redirect(shortUrl.full)
})
// POST request - create short URL
app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
})

app.listen(process.env.PORT || 5000);