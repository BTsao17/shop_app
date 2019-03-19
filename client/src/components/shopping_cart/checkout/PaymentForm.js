import React, { Component } from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';

class PaymentForm extends Component {
  onPaymentChange = (e) => {
    const infoType = 'paymentInfo';
    this.props.handleInfoChange(e, infoType);
  };

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Payment Method
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardName"
              name="cardName"
              label="name on card"
              type="string"
              fullWidth
              value={this.props.paymentInfo.cardName}
              onChange={this.onPaymentChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              name="cardNumber"
              label="card number"
              fullWidth
              value={this.props.paymentInfo.cardNumber}
              onChange={this.onPaymentChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="expDate"
              name="expDate"
              label="expiry date"
              placeholder="MM/YY"
              fullWidth
              value={this.props.paymentInfo.expDate}
              onChange={this.onPaymentChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              name="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              value={this.props.paymentInfo.cvv}
              onChange={this.onPaymentChange}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default PaymentForm;
