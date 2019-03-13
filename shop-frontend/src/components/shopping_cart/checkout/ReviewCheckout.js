import React, { Component } from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom'
import { Grid, Typography, List, ListItem, ListItemText } from '@material-ui/core';

const PST_Rate = 0.07;
const GST_Rate = 0.05;

class ReviewCheckout extends Component {
  priceRow = (qty, unit) => {
    return qty * unit;
  };

  render() {
    const { purchasedItems, shippingAddress, billingAddress, paymentInfo, checked } = this.props;

    const itemsList = purchasedItems.map((item) => {
      const itemSubtotal = this.priceRow(item.quantity, item.price).toFixed(2);
      const itemQuantityText = `Quantity: ${item.quantity}`;
      return (
        <ListItem key={item.name}>
          <ListItemText primary={item.name} secondary={itemQuantityText} />
          <Typography variant="body2">{itemSubtotal}</Typography>
        </ListItem>
      );
    });

    const invoiceSubtotal = purchasedItems
      .map((item) => this.priceRow(item.quantity, item.price))
      .reduce((sum, i) => sum + i, 0);
    const calculateGST = GST_Rate * invoiceSubtotal;
    const calculatePST = PST_Rate * invoiceSubtotal;
    const invoiceTotal = invoiceSubtotal + calculateGST + calculatePST;

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        {/* Cart Summary */}
        <List disablePadding>
          {itemsList}
          <ListItem>
            <ListItemText primary="Subtotal" />
            <Typography variant="body2">${invoiceSubtotal.toFixed(2)}</Typography>
          </ListItem>
          <ListItem>
            <ListItemText primary="GST 5%" />
            <Typography variant="body2">${calculateGST.toFixed(2)}</Typography>
          </ListItem>
          <ListItem>
            <ListItemText primary="PST 7%" />
            <Typography variant="body2">${calculatePST.toFixed(2)}</Typography>
          </ListItem>
          <ListItem>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1">${invoiceTotal.toFixed(2)}</Typography>
          </ListItem>
        </List>
        {/* Addresses Details */}
        <Grid container spacing={16}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <Typography gutterBottom>
              {shippingAddress.firstName} {shippingAddress.lastName}
            </Typography>
            <Typography gutterBottom>{shippingAddress.addressL1}</Typography>
            {shippingAddress.addressL2 !== '' && <Typography gutterBottom>{shippingAddress.addressL2}</Typography>}
            <Typography gutterBottom>
              {shippingAddress.city} {shippingAddress.province}
            </Typography>
            <Typography gutterBottom>
              {shippingAddress.postalCode} {shippingAddress.country}
            </Typography>

            <Typography variant="h6" gutterBottom>
              Billing Address
            </Typography>
            {checked ? (
              <Typography gutterBottom>Same as Shipping Address</Typography>
            ) : (
              <React.Fragment>
                <Typography gutterBottom>
                  {billingAddress.firstName} {billingAddress.lastName}
                </Typography>
                <Typography gutterBottom>{billingAddress.addressL1}</Typography>
                {billingAddress.addressL2 !== '' && <Typography gutterBottom>{billingAddress.addressL2}</Typography>}
                <Typography gutterBottom>
                  {billingAddress.city} {billingAddress.province}
                </Typography>
                <Typography gutterBottom>
                  {billingAddress.postalCode} {billingAddress.country}
                </Typography>
              </React.Fragment>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Payment Details
            </Typography>
            <Typography gutterBottom>Card holder: {paymentInfo.cardName}</Typography>
            <Typography gutterBottom>Card number: {paymentInfo.cardNumber}</Typography>
            <Typography gutterBottom>Expiry date: {paymentInfo.expDate}</Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default ReviewCheckout;
