const express = require ('express');
const request = require('request');

const app = express();

const  apiURL = 'https://api.hitbtc.com/api/2/public';

app.listen(8000, () => {
  console.log('Server started!');
});

app.all("/backend/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  return next();
});

function makePublicRequest(res, url, method = 'GET') {
  console.log(url);
  request({
    method,
    url,
  }, function (error, response, body) {
    if (!error) {
      res.status(200).send(JSON.stringify(body));
    } else {
      res.status(500).send(error);
    }
  });
}

app.route('/backend/getOrderbook/:orderbook').get((req, res) => {
  console.log('/getOrderbook/');
  const orderbookName = req.params['orderbook'];
  // const url = 'https://api.hitbtc.com/api/2/public/orderbook/ETHBTC?limit=1';
  const url = `${apiURL}/orderbook/${orderbookName}?limit=1`;
  makePublicRequest(res, url);
});
