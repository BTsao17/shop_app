import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import './App.css'
import { Home, Shop, Header, ShoppingCart } from './components';
import axios from 'axios';
import { CssBaseline } from '@material-ui/core';

class App extends Component {
  state = {
    username: '',
    loggedIn: false,
    shoppingCart: [],
  };

  updateName = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    this.setState(
      {
        username: name,
        loggedIn: true,
      },
      () => {
        localStorage.setItem('username', this.state.username);
      }
    );
  };

  componentDidMount() {
    const name = localStorage.getItem('username');

    if (name) {
      this.setState({
        username: name,
        loggedIn: true,
      });
    }

    axios.get('http://localhost:8080/cart').then((response) => {
      this.setState({
        shoppingCart: response.data,
      });
    });
  }

  componentDidUpdate() {
    //this takes care of both adding and removing an item from the cart
    axios
      .post('http://localhost:8080/cart', this.state.shoppingCart)
      .then((response) => {
        // console.log(response.data)
      })
      .catch((err) => console.log(err));
  }

  logOut = () => {
    localStorage.clear();
    this.setState(
      {
        username: '',
        loggedIn: false,
        shoppingCart: [],
      },
      //may be unnecessary since we've set the state which will evoke componentDidUpdate and clear it already.
      () => this.clearCart()
    );
  };

  clearCart = () => {
    axios
      .delete('http://localhost:8080/clear', this.state.shoppingCart)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };

  addItemToCart = (itemInfo) => {
    const findDuplicate = this.state.shoppingCart.find((product) => {
      return product.name === itemInfo.name;
    });

    if (!findDuplicate) {
      const newCart = this.state.shoppingCart.concat([ { ...itemInfo, quantity: 1 } ]);

      this.setState({
        shoppingCart: newCart,
      });
    }
    else {
      const newCart = this.state.shoppingCart.map((product) => {
        if (product.name === itemInfo.name) {
          product = { ...product, quantity: product.quantity + 1 };
          return product;
        }
        else {
          return product;
        }
      });

      this.setState({
        shoppingCart: newCart,
      });
    }
  };

  removeItem = (itemInfo) => {
    const { shoppingCart } = this.state;
    const updatedCart = shoppingCart.filter((item) => {
      // if (item.name === itemInfo.name) {
      //   axios.delete('http://localhost:8080/cart', itemInfo.name)
      //   .then((response) => console.log(response.data))
      //   .catch((err) => {console.log(err)})
      // }
      return item.name !== itemInfo.name;
    });
    this.setState({
      shoppingCart: updatedCart,
    });
  };

  render() {
    const { username, loggedIn, shoppingCart } = this.state;

    const quantityInCart = shoppingCart.reduce((accumulator, currentV) => {
      return accumulator + currentV.quantity;
    }, 0);

    return (
      <React.Fragment>
        <CssBaseline />
        <Header logOut={this.logOut} quantityInCart={quantityInCart} />

        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              return loggedIn ? <Redirect to="/shop" /> : <Home updateName={this.updateName} />;
            }}
          />
          <Route
            path="/shop"
            render={(renderProps) => {
              return loggedIn ? (
                <Shop username={username} loggedIn={loggedIn} addItemToCart={this.addItemToCart} {...renderProps} />
              ) : (
                <Redirect to="/" exact />
              );
            }}
          />
          <Route
            path="/cart"
            render={(renderProps) => {
              return loggedIn ? (
                <ShoppingCart
                  purchasedItems={shoppingCart}
                  removeItem={this.removeItem}
                  clearCart={this.clearCart}
                  {...renderProps}
                />
              ) : (
                <Redirect to="/" exact />
              );
            }}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
