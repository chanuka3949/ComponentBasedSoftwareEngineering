const express = require('express')
const connectToDatabase = require('./mongo-client');

//Connect to Database
connectToDatabase()

const app = express()
const port = process.env.PORT || 5500;

app.get('/', (req, res) => {
  res.send('Hello, World!')
})


app.listen(port, () => {
  console.log('Server listening on port 3000');
})
