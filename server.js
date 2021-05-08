const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const app = express();
const ShortUrl = require('./models/shortUrl');
require('dotenv').config();


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({extended:false})); 
app.use(express.json()); 
app.use('/public',express.static('./public'));


// Connect to mongoDB 
const URI = process.env.MONGO_URI;
mongoose.connect( URI , {
	 useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true
}).then(console.log('Connected to mongoDB'))
	.catch((e) => console.log(e));


app.get('/',async (req, res) => {
    let shortUrls = await ShortUrl.find({});
	res.render('index', {shortUrls});
})

app.post('/shortUrl', async (req, res) => {
    let {label, url } = req.body;
    try {
        await ShortUrl.create({
            label: label,
            full: url
        })
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
    
} )

app.get('/:shortUrl', async (req, res) => {
    try {
        let Url = await  ShortUrl.findOne({short: req.params.shortUrl});
        if(Url == null) return res.status(404);

        Url.clicks++;
        Url.save();

        res.redirect(Url.full);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})



app.listen(PORT, () => console.log(`Listening to port ${PORT}`))
