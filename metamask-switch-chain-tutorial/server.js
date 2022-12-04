const express = require('express')
const path = require('path');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.use(express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log(`Metamask integration tutorial running on ${port}`)
})