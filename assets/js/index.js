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
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10')
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log('API fetch result: ', data);
        createCoinTable(data);
    }).catch(function (error) {
        console.log(error);
    });

async function createCoinTable(coinData) {
    const coinTable = $('#coinTable');

    // create a table row for each coin in the list
    for (let key in coinData) {
        let coin = coinData[key];
        console.log(`creating table row for: ${coin.name}`);
        coinTable.append(
            $('<tr></tr>').append(
                $('<td></td>').text(coin.market_cap_rank),
                $('<td></td>').text(coin.symbol),
                $('<td></td>').text(coin.name),
                $('<td></td>').text(coin.market_cap),
                $('<td></td>').text(coin.current_price)
            )
        );
    }
}
