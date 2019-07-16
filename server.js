const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const products = require('./data-files/products');
const port = process.env.PORT || process.argv[2] || 8080;

const path = require('path');

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
// }

//figuring out how to deploy properly using build production with 
//Express static files & Routing, and Create-React-App 
// app.use(express.static(path.join(_dirname, 'build')));
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(_dirname, 'build', 'index.html'));
// });

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
