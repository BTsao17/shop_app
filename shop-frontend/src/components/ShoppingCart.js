import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Cart, Checkout } from './';
import '../css/ShoppingCart.css';

class ShoppingCart extends Component {
  render() {
    const { match, purchasedItems, removeItem } = this.props;
    return (
      <div>
        <Switch>
          <Route
            path={match.path}
            exact
            render={(renderProps) => {
              return (
                <Cart
                  purchasedItems={purchasedItems}
                  removeItem={removeItem}
                  {...renderProps} // use this for match.url in Cart Component to redirect to checkout component
                />
              );
            }}
          />
          <Route
            path={match.path + '/checkout'}
            render={() => {
              return <Checkout purchasedItems={purchasedItems} clearCart={this.props.clearCart}/>;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default ShoppingCart;
