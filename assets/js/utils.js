const fmt = {
    c: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 6 }),
    c0: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }),
    n0: new Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: 0 }),
    n2: new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2 }),
    p2: new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }),
};

let lastSort = {
    column: 'market_cap',
    order: 'DESC'
};

function getSortOrder(colName) {
    if (lastSort.name == colName) {
        if (lastSort.order == 'DESC') {
            return 'ASC';
        }
        return 'DESC';
    }
    return 'ASC';
}

function updateSortOrder(columnName, order) {
    lastSort.name = columnName;
    lastSort.order = order;
}

function sortData(data, byColumn, order = 'ASC') {
    console.log(`sorting data by ${byColumn} ${order}...`);
    if (!data || !data.length) {
        return;
    }
    if (order == 'ASC') {
        sortAcending(data, byColumn);
    } else {
        sortDescending(data, byColumn);
    }
    
    updateSortOrder(byColumn, order);

    return data;
}

function sortAcending(data, byColumn) {
    data.sort(function (a, b) {
        if (a[byColumn] > b[byColumn]) {
            return 1;
        } else if (a[byColumn] < b[byColumn]) {
            return -1;
        } else {
            return 0;
        }
    });
    console.log('sorted: ', data);
    return data;
}

function sortDescending(data, byColumn) {
    data.sort(function (a, b) {
        if (a[byColumn] > b[byColumn]) {
            return -1;
        } else if (a[byColumn] < b[byColumn]) {
            return 1;
        } else {
            return 0;
        }
    });
    console.log('sorted: ', data);
    return data;
}