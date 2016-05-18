var fs = require('fs');
var dataArray = fs.readFileSync('sample/sample.txt').toString().split("\n");
var _ = require('underscore');
var readline = require('readline'),
	rl = readline.createInterface(process.stdin, process.stdout);


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

function getById(fieldValue){
	var res = getBy(fieldValue, 0);
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

function getByOrder(fieldValue){
	var res = getBy(fieldValue, 3);
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
		str = _.findWhere(arrayOfValues, {fieldValue: arr[3].replace(/\\r/gi, '')});
		if (!str) {
			arrayOfValues.push({
				count: 1,
				fieldValue: arr[3]
			});
		} else {
			str.count += 1;
		}
	}
	arrayOfValues = _.sortBy(arrayOfValues, function(item){ return -item.count });
	for (var j = 0; j < arrayOfValues.length; j++){
		res.push(arrayOfValues[j].fieldValue + ' x ' + arrayOfValues[j].count);
	}
	return res;
	
}

if (process.argv.length <= 2) {
	console.log("Usage: " + __filename + " SOME_PARAM");
	process.exit(-1);
}

var param = process.argv[3];
var paramName = process.argv[2];


if (paramName === 'address') {
	console.log(getByAddress(param.replace(/\'/g, '')));
	process.exit(-1);
}

if (paramName === 'company') {
	console.log(getByCompany(param.replace(/\'/g, '')));
	process.exit(-1);
}

if (paramName === 'remove') {
	deleteItem(param.replace(/\'/g, ''));
	console.log(dataArray);
	process.exit(-1);
}

if (paramName === 'order') {
	console.log(getItemCount());
	process.exit(-1);
}

/*
var company = getByCompany('SuperTrader');
console.log(x);

var y = getByAddress('Steindamm 80');
console.log(y);

deleteItem('006');
console.log(dataArray);

var z = getItemCount();
console.log(z);*/