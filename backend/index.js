const express = require('express')
const app = express()
const port = process.env.PORT || 4000;

app.get('/', (req, res) => res.send('Helloasdf World!'))
app.get('/test', (req, res) => res.send('Helloasdf World!'))

app.listen(port, () => console.log(`Exasadfmple app listening on port ${port}!`))