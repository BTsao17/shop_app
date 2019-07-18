import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import ShopNavBar from './ShopNavBar';
import ProductsList from './ProductsList';

class Shop extends Component {
  state = {
    inkProducts: [],
    penProducts: [],
  };

  componentDidMount() {
    //need to remove url base localhost:8080 when using a proxy (and concurrently), so we don't need CORS 
    //want request to be made to Webpack dev server, which will infer what traffic to proxy
    axios.get('/products').then((response) => {
      this.setState({
        inkProducts: response.data.inkProducts,
        penProducts: response.data.penProducts,
      });
    });
  }

  render() {
    const { match } = this.props;

    return (
      <div>
        {/* tabbed menu for products using components*/}
        {/* need to pass this.props.match down because need the url and path info of the renderProps */}
        <ShopNavBar match={match} />

        <Typography variant="h4" align="center" className="title--padding">
          Welcome {this.props.username}!
        </Typography>

        <Switch>
          <Route
            path={match.path + '/fountain_pens'}
            render={() => {
              return (
                <ProductsList
                  category="Fountain Pens"
                  products={this.state.penProducts}
                  addItemToCart={this.props.addItemToCart}
                />
              );
            }}
          />
          <Route
            path={match.path + '/inks'}
            render={() => {
              return (
                <ProductsList
                  category="Inks"
                  products={this.state.inkProducts}
                  addItemToCart={this.props.addItemToCart}
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default Shop;
