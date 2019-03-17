const express = require('express');
const bodyParser = require("body-parser");
const request = require('request');
const keys = require('./backend/keys');
const fs = require('fs');

const apiURL = 'https://api.hitbtc.com/api/2';
const positionFileName = './backend/positions.json';
const positionFile = require(positionFileName);

const app = express();
app.use(bodyParser.json());

function getKeysById(id) {
  return keys.values[keys.mapping[id.toString()]];
}

app.all("/*", function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  response.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  return next();
});

app.use(express.static(__dirname + '/dist/'));

app.listen(process.env.PORT || 8080, () => {
  console.log('Server started!');
});

app.route('/backend/savePositions').post((request, response) => {
  const body = request.body;
  positionFile.positions = body;
  fs.writeFile(positionFileName, JSON.stringify(positionFile), (error) => {
    if (!error) {
      response.status(200).send(JSON.stringify(body));
    } else {
      response.status(500).send(error);
    }
  });
});

function makePublicRequest(response, url, method = 'GET') {
  console.log(`Public: ${url}`);
  request({
    method,
    url,
  }, function (error, res, body) {
    if (!error) {
      response.status(200).send(JSON.stringify(body));
    } else {
      response.status(500).send(error);
    }
  });
}

app.route('/backend/getOrderbook/:orderbook').get((request, response) => {
  const orderbookName = request.params['orderbook'];
  const url = `${apiURL}/public/orderbook/${orderbookName}?limit=1`;
  makePublicRequest(response, url);
});

app.route('/backend/symbol/:symbol').get((request, response) => {
  const symbol = request.params['symbol'];
  const url = `${apiURL}/public/symbol/${symbol}`;
  makePublicRequest(response, url);
});

function makePrivateRequest(type, response, url, method = 'GET', body) {
  console.log(`Private: ${url}`);
  const {api, secret} = getKeysById(type);
  request({
    method,
    url,
    auth: {
      'user': api,
      'pass': secret
    },
    json: body,
  }, function (error, res, body) {
    if (!error) {
      response.status(200).send(JSON.stringify(body));
    } else {
      response.status(500).send(error);
    }
  });
}

app.route('/backend/trading/balance').get((request, response) => {
  makePrivateRequest(0, response, `${apiURL}/trading/balance`);
});

app.route('/backend/history/order').get((request, response) => {
  makePrivateRequest(0, response, `${apiURL}/history/order`);
});

app.route('/backend/order').post((request, response) => {
  makePrivateRequest(1, response, `${apiURL}/order`, 'POST', request.body);
});

