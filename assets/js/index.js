/* Get the coin market data from the CoinGecko API
   see the docs here https://www.coingecko.com/en/api

    DATA_SOURCE:
        'TEST' (default) will fetch from the JSON file
        'LIVE' will fetch from the API    
*/
const DATA_SOURCES = {
    test: 'TEST',
    live: 'LIVE',    
};
const DATA_SOURCE = DATA_SOURCES.live;
const API_BASE_URL = 'https://api.coingecko.com/api/v3';
const TEST_DATA_URL = '/assets/js/test-data-crypto.json';
const PAGE_SIZE = 100;
let curPageNum = 1;
let totalPages = 1;

async function refreshTabe() {
    let data = await getCoinData();
    createCoinTable(data);
}
refreshTabe();

function getCoinData() {
    let url;
    if (DATA_SOURCE === 'LIVE') {
        url = `${API_BASE_URL}/coins/markets?vs_currency=usd&per_page=${PAGE_SIZE}&page=${curPageNum}`;
    } else {
        url = 'TEST_DATA_URL';
    }
    console.log('api url: ', url);
    return fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(`fetch returned ${data.length} results`);
            return data;
        }).catch(function (error) {
            console.log(error);
        });
}

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
                $(`<td class="${coin.price_change_percentage_24h > 0 ? 'positive-change' : 'negative-change'}"></td>`).text(fmt.p2.format(coin.price_change_percentage_24h / 100)),
                $('<td></td>').text(''), // price graph?
            )
        );
    }
}

$('a.sortable-link').click(function () {
    let target = $('this');
    let a = target.prevObject[0].activeElement;
    console.log('sortable-link clicked: ', a);
    
    // sort the list
    let order = getSortOrder(a.name);
    sortCoinList(a.name, order);
});

async function sortCoinList(byColumnName, order) {
    console.log(`sort coin list by ${byColumnName}`);
    data = await getCoinData();
    sortData(data, byColumnName, order);
    createCoinTable(data);
}

// Pagination
// Next
let prevButton = $('a.app-page-prev');

$('a.app-page-next').click(async function() {
    curPageNum += 1;    
    refreshTabe();
    hideShowPrev();
});

// previous
$('a.app-page-prev').click(function() {
    if (curPageNum === 1) {
        return; // already at first page
    }    
    curPageNum -= 1;
    refreshTabe();
    hideShowPrev();
});

function hideShowPrev() {    
    if (curPageNum === 1) {
        $('li.app-page-prev').hide();
    } else {
        $('li.app-page-prev').show();
    }
}

// the current page will be 1 when the page loads so hide prev
hideShowPrev();
