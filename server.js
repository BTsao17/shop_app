const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const cors = require('cors');
const products = require('./data-files/products');
const port = process.env.PORT || process.argv[2] || 3001;

// app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

let shoppingCart = [];

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/cart', (req, res) => {
  shoppingCart = req.body;
  res.json(shoppingCart);
});

app.get('/cart', (req, res) => {
  res.json(shoppingCart);
});

app.delete('/clear', (req, res) => {
  shoppingCart = req.body;
  res.send('cleared shopping cart on logout');
});

app.listen(port, () => console.log(`Listening on ${port}`));
