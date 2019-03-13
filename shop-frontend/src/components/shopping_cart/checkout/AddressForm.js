import React, { Component } from 'react';
import { Grid, Typography, TextField, FormControlLabel, Checkbox } from '@material-ui/core';

class AddressForm extends Component {
  onAddressChange = (e) => {
    const addressType = this.props.addressType.toLowerCase() + 'Address';
    this.props.handleInfoChange(e, addressType);
  };

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          {this.props.addressType} Address
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              type="string"
              fullWidth
              value={
                this.props.addressType === 'Shipping' ? (
                  this.props.shippingAddress.firstName
                ) : (
                  this.props.billingAddress.firstName
                )
              }
              onChange={this.onAddressChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              type="string"
              fullWidth
              value={
                this.props.addressType === 'Shipping' ? (
                  this.props.shippingAddress.lastName
                ) : (
                  this.props.billingAddress.lastName
                )
              }
              onChange={this.onAddressChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="addressL1"
              name="addressL1"
              label="Address line 1"
              type="string"
              fullWidth
              value={
                this.props.addressType === 'Shipping' ? (
                  this.props.shippingAddress.addressL1
                ) : (
                  this.props.billingAddress.addressL1
                )
              }
              onChange={this.onAddressChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="addressL2"
              name="addressL2"
              label="Address line 2"
              type="string"
              fullWidth
              value={
                this.props.addressType === 'Shipping' ? (
                  this.props.shippingAddress.addressL2
                ) : (
                  this.props.billingAddress.addressL2
                )
              }
              onChange={this.onAddressChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              type="string"
              fullWidth
              value={
                this.props.addressType === 'Shipping' ? this.props.shippingAddress.city : this.props.billingAddress.city
              }
              onChange={this.onAddressChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="province"
              name="province"
              label="State/Province/Region"
              type="string"
              fullWidth
              value={
                this.props.addressType === 'Shipping' ? (
                  this.props.shippingAddress.province
                ) : (
                  this.props.billingAddress.province
                )
              }
              onChange={this.onAddressChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="postalCode"
              name="postalCode"
              label="Zip / Postal code"
              type="string"
              fullWidth
              value={
                this.props.addressType === 'Shipping' ? (
                  this.props.shippingAddress.postalCode
                ) : (
                  this.props.billingAddress.postalCode
                )
              }
              onChange={this.onAddressChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              type="string"
              fullWidth
              value={
                this.props.addressType === 'Shipping' ? (
                  this.props.shippingAddress.country
                ) : (
                  this.props.billingAddress.country
                )
              }
              onChange={this.onAddressChange}
            />
          </Grid>
          {/* allows for conditional rendering of checkbox */}
          {this.props.addressType === 'Shipping' && (
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.props.checked}
                    onChange={this.props.handleCheckboxChange}
                    color="primary"
                    name="saveAddress"
                  />
                }
                label="Use the same address for billing address"
              />
            </Grid>
          )}
        </Grid>
      </React.Fragment>
    );
  }
}

export default AddressForm;
