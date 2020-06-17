function getData() {
    let url = `https://api.coingecko.com/api/v3/exchanges?&per_page=10`;
    console.log('api url: ', url);
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('API fetch result: ', data);
            createTable(data);
        }).catch(function (error) {
            console.log(error);
        });
}

// live data
getData();

// test data
// fetch('/assets/js/test-data-exchanges.json')
//     .then(function (response) {
//         return response.json();
//     }).then(function (data) {
//         console.log('Test data: ', data);
//         createTable(data);
//     }).catch(function (error) {
//         console.log(error);
//     });

function createTable(data) {
    console.log('creatting exchanges table');
    // clear out any old elements
    $('tr.content-row').remove();
    const coinTable = $('#exchangeTable');

    // create a table row for each coin in the list
    for (let key in data) {
        let exchange = data[key];
        // console.log(`creating table row for: ${exchange.name}`);
        coinTable.append(
            $('<tr class="content-row"></tr>').append(
                $('<td class="text-left"></td>').text(exchange.trust_score_rank),
                $('<td class="text-left"></td>').append(
                    $('<div></div>').append(
                        `<img src="${exchange.image}" width="16" height="16"> ${exchange.name}`
                    )),
                $('<td ></td>').text(fmt.n0.format(exchange.trade_volume_24h_btc_normalized) + ' BTC'),
            )
        );
    }
}