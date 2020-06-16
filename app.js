// https://auth0.com/blog/create-a-simple-and-stylish-node-express-app/

const express = require('express');
const path = require('path');
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

/**
* App Variables
*/
const app = express();
const port = process.env.PORT || 8000;

/**
*  App Configuration
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "public")));

/**
* Routes Definitions
*/
app.get('/', async (req, res) => {
    const coinList = await CoinGeckoClient.coins.markets({per_page: 10, page: 1});
    console.log('CoinGeckoClint.coins.markets: ', coinList);

    res.render('index', {
        title: 'Coin Top List',
        coins: coinList.data
    });
});

/**
* Server Activation
*/
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});