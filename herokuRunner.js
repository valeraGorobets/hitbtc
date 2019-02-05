const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/hitbtc'));

app.get('/*', function(req,res) {
  const index = path.join(__dirname + '/dist/hitbtc/index.html');
  res.sendFile(path.join(index));
});

app.listen(process.env.PORT || 8080);
