var fs = require('fs');
var dataArray = fs.readFileSync('sample/sample.txt').toString().split("\n");
var _ = require('underscore');

function getBy(fieldValue, fieldCount, callback){
    var res = [], arr;
    for (var i = 0; i < dataArray.length; i++){
        arr = dataArray[i].split(", ");
        if (arr[fieldCount] === fieldValue.replace(/\\r/g, '') ) {
            if(callback){
                callback(dataArray[i], i);
            } else {
                res.push(dataArray[i]);
            }
        }
    }
    return res;
}

function getByCompany(fieldValue){
    var res = getBy(fieldValue, 1);
    return res;
}

function getByAddress(fieldValue){
    var res = getBy(fieldValue, 2);
    return res;
}


function deleteItem(itemId){
    var callback = function(item, i){
        dataArray.splice(i, 1);
    };
    getBy(itemId, 0, callback);
}

function getItemCount(){
    var arrayOfValues = [], res = [], arr, str;
    for (var i = 0; i < dataArray.length; i++){
        arr = dataArray[i].split(", ");
        str = _.findWhere(arrayOfValues, {fieldValue: arr[3].replace(/[\n\t\r]/g,"")});
        if (!str) {
            arrayOfValues.push({
                count: 1,
                fieldValue: arr[3].replace(/[\n\t\r]/g,"")
            });
        } else {
            str.count += 1;
        }
    }
    arrayOfValues = _.sortBy(arrayOfValues, function(item){ return -item.count });
    for (var j = 0; j < arrayOfValues.length; j++){
        res.push(arrayOfValues[j].fieldValue + ' x ' + arrayOfValues[j].count + '\r');
    }
    console.log(res);
    return res;

}

function formatData(data){
    var res = [], arr;
    for (var i = 0; i < data.length; i++){
        arr = data[i].split(", ");
        res.push(arr);
    }
    return res;
}

function parseResult(data){
    var res = [], arr = formatData(data);
    res = arr.join("\n");
    return res;
}

function parseQuery(req, method) {
    var res, arr;
    if (method === "GET") {
        if (req.query.address) {
            res = parseResult(getByAddress(req.query.address));
        } else if (req.query.company) {
            res = parseResult(getByCompany(req.query.company));
        } else if (req.query.orderCounter) {
            res =  parseResult(getItemCount());
        } else {
            res = formatData(dataArray);
        }
    }

    if (method === "DELETE") {
        deleteItem(req.query.id);
        res = parseResult(dataArray);
    }

    return res;
}


module.exports = {
    parseQuery: parseQuery
};