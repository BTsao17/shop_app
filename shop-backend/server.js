const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const products = require('./data-files/products') //importing products from a separate file 

app.use(cors())
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json())

let shoppingCart = []

app.get('/products', (req, res) => {
  res.json(products)
})

app.post('/cart', (req, res) => {
  shoppingCart = req.body
  res.send(shoppingCart)

});

app.get('/cart', (req, res) => {
  res.json(shoppingCart)
});

app.delete('/clear', (req, res) => {
  shoppingCart = req.body
  res.send('cleared shopping cart on logout')
});

app.listen(8080, () => {
  console.log('listening at port 8080')
});