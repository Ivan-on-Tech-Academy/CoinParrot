/* DATA_SOURCE:
    'TEST' (default) will fetch from the JSON file
    'LIVE' will fetch from the API    
*/
const DATA_SOURCES = {
    test: 'TEST',
    live: 'LIVE',    
};
const DATA_SOURCE = DATA_SOURCES.live;
const API_BASE_URL = 'https://api.coingecko.com/api/v3';
const TEST_DATA_URL = '/assets/js/test-data-exchanges.json';
const PAGE_SIZE = 100;
let curPageNum = 1;
let totalPages = 1;

async function refreshTabe() {
    let data = await getData();
    createTable(data);
}
refreshTabe();

function getData() {
    let url = '/assets/js/test-data-exchanges.json';
    if (DATA_SOURCE == 'LIVE') {
        url = `${API_BASE_URL}/exchanges?&per_page=${PAGE_SIZE}&page=${curPageNum}`;
    } 
    console.log('api url: ', url);
    return fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(`fetch returnd ${data.length} results`);
            return data;
        }).catch(function (error) {
            console.log(error);
        });
}

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

$('a.sortable-link').click(function () {
    let target = $('this');
    let a = target.prevObject[0].activeElement;
    console.log('sortable-link clicked: ', a);

    let order = getSortOrder(a.name);
    sortExchangeList(a.name, order);
});

async function sortExchangeList(byColumnName, order) {
    console.log(`sort coin list by ${byColumnName}`);
    data = await getData();
    sortData(data, byColumnName, order);
    createTable(data);
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