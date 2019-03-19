import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Product from './Product';

class ProductsList extends Component {
  render() {
    const productList = this.props.products.map((product) => {
      return <Product key={product.name} item={product} addItemToCart={this.props.addItemToCart} />;
    });

    return (
      <div>
        <Grid container spacing={24} className="grid--padding">
          {productList}
        </Grid>
      </div>
    );
  }
}

export default ProductsList;
