const express = require('express');
// const path = require('path');
const request = require('request');
const keys = {
  "mapping": {
    "0": "Order book, History, Trading balance",
    "1": "Place/cancel orders",
    "2": "Payment information",
    "3": "Withdraw cryptocurrencies"
  },
  "values": {
    "Order book, History, Trading balance": {
      "api": "be1fa2f8fe7f45fafcb096f0c1804946",
      "secret": "a44aa0ee368d231b3da5025ac97124db"
    },
    "Place/cancel orders": {
      "api": "b9be008b89e6185a86c2661fb2ce34ba",
      "secret": "563ae92cf74bbf262685f346915ab91f"
    },
    "Payment information": {
      "api": "a1c4ba1425114a0c97822a82b7cb314e",
      "secret": "0bcf226bf4d7c9378e8a5d63d8905e77"
    },
    "Withdraw cryptocurrencies": {
      "api": "be1fa2f8fe7f45fafcb096f0c1804946",
      "secret": "8e2bec9c5f631ff812784137f29ea898"
    }
  }
};

const apiURL = 'https://api.hitbtc.com/api/2';

const app = express();

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


