/* Get the coin market data from the CoinGecko API
   see the docs here https://www.coingecko.com/en/api
   It will return JSON data like the following
   [
       0: {
           ath: 19665.39
            ath_change_percentage: -51.87083
            ath_date: "2017-12-16T00:00:00.000Z"
            atl: 67.81
            atl_change_percentage: 13858.01753
            atl_date: "2013-07-06T00:00:00.000Z"
            circulating_supply: 18406550
            current_price: 9504.19
            high_24h: 9568.47
            id: "bitcoin"
            image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
            last_updated: "2020-06-16T18:30:38.343Z"
            low_24h: 9387.4
            market_cap: 174970354915
            market_cap_change_24h: 1991371832
            market_cap_change_percentage_24h: 1.15122
            market_cap_rank: 1
            name: "Bitcoin"
            price_change_24h: 106.02
            price_change_percentage_24h: 1.12807
            roi: null
            symbol: "btc"
            total_supply: 21000000
            total_volume: 27009706099
       },
       1: {} // etc
       2: {}
   ]
*/
let lastSort = 'market_cap_desc';

function getCoinData(sortBy) {
    let sortParam = '';
    if (sortBy) {
        lastSort = sortBy;
        sortParam = `&order=${sortBy}`;
    }
    let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10${sortParam}`;
    console.log('api url: ', url);
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('API fetch result: ', data);
            createCoinTable(data);
        }).catch(function (error) {
            console.log(error);
        });
}

// live data
getCoinData('market_cap_desc');

// test data
// fetch('/assets/js/test-data.json')
//     .then(function (response) {
//         return response.json();
//     }).then(function (data) {
//         console.log('Test data: ', data);
//         createCoinTable(data);
//     }).catch(function (error) {
//         console.log(error);
//     });

const fmt = {
    c: new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 6}),
    c0: new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0}),
    n0: new Intl.NumberFormat('en-US', {style: 'decimal', maximumFractionDigits: 0}),
    n2: new Intl.NumberFormat('en-US', {style: 'decimal', minimumFractionDigits: 2}),
    p2: new Intl.NumberFormat('en-US', {style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2}),
};

function createCoinTable(coinData) {
    console.log('creating coin table');
    // clear out any old elements
    $('tr.content-row').remove();
    const coinTable = $('#coinTable');    

    // create a table row for each coin in the list
    for (let key in coinData) {
        let coin = coinData[key];
        // console.log(`creating table row for: ${coin.name}`);
        coinTable.append(
            $('<tr class="content-row"></tr>').append(
                $('<td class="text-left"></td>').text(coin.market_cap_rank),
                $('<td class="text-left"></td>').append(
                    $('<div></div>').append(
                        `<img src="${coin.image}" width="16" height="16"> ${coin.name}`
                    )),
                $('<td ></td>').text(fmt.c0.format(coin.market_cap)),
                $('<td></td>').text(fmt.c.format(coin.current_price)),
                $('<td></td>').text(fmt.c0.format(coin.total_volume)),
                $('<td></td>').text(fmt.n0.format(coin.circulating_supply)),
                $('<td></td>').text(fmt.p2.format(coin.price_change_percentage_24h/100)),
                $('<td></td>').text(''), // price graph?
            )
        );
    }
}

//sorting coin table
$('a.sortable-by-id').click(function() {
    if (lastSort == 'id_asc') {
        console.log('Sorting by name DESC');
        getCoinData('id_desc')
    } else {
        console.log('Sorting by name ASC');
        getCoinData('id_asc')
    }    
});

$('a.sortable-by-market-cap').click(function() {
    if (lastSort == 'market_cap_desc') {
        console.log('Sorting by market cap ASC');
        getCoinData('market_cap_asc')
    } else {
        console.log('Sorting by market cap DESC');
        getCoinData('market_cap_desc')
    }   
});

$('a.sortable-by-volume').click(function() {
    if (lastSort == 'volume_asc') {
        console.log('Sorting by volume DESC');
        getCoinData('volume_desc')
    } else {
        console.log('Sorting by volume ASC');
        getCoinData('volume_asc')
    }    
});
