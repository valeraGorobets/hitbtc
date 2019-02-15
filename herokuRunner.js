const express = require('express');
const path = require('path');
const request = require('request');
const keys = require('./backend/keys');

const apiURL = 'https://api.hitbtc.com/api/2';

const app = express();

function getKeysById(id) {
  return keys.values[keys.mapping[id.toString()]];
}

// app.all("/*", function(request, response, next) {
//   response.header("Access-Control-Allow-Origin", "*");
//   response.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
//   response.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//   return next();
// });

app.use(express.static(__dirname + '/dist/'));

// app.get('/', function(req,res) {
//   const index = path.join(__dirname + '/dist/hitbtc/index.html');
//   res.sendFile(path.join(index));
// });

app.listen(process.env.PORT || 8080, () => {
  console.log('Server started!');
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

function makePrivateRequest(type, response, url, method = 'GET') {
  console.log(`Private: ${url}`);
  const {api, secret} = getKeysById(type);
  request({
    method,
    url,
    auth: {
      'user': api,
      'pass': secret
    }
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


