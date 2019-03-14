import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper, Typography, Stepper, Step, StepLabel, Button } from '@material-ui/core';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import ReviewCheckout from './ReviewCheckout';

class Checkout extends Component {
  state = {
    activeStep: 0,
    checked: false,
    shippingAddress: {
      firstName: '',
      lastName: '',
      addressL1: '',
      addressL2: '',
      city: '',
      province: '',
      postalCode: '',
      country: '',
    },
    billingAddress: {
      firstName: '',
      lastName: '',
      addressL1: '',
      addressL2: '',
      city: '',
      province: '',
      postalCode: '',
      country: '',
    },
    paymentInfo: {
      cardName: '',
      cardNumber: '',
      expDate: '',
      cvv: '',
    },
  };

  getSteps = () => {
    return [ 'Shipping address', 'Billing address', 'Payment details', 'Review your order' ];
  };

  getStepContent = (step) => {
    const { shippingAddress, billingAddress, paymentInfo, checked } = this.state;
    const { purchasedItems } = this.props;
    switch (step) {
      case 0:
        return (
          <AddressForm
            addressType={'Shipping'}
            shippingAddress={shippingAddress}
            handleInfoChange={this.handleInfoChange}
            checked={checked}
            handleCheckboxChange={this.handleCheckboxChange}
            copyAddress={this.copyAddress}
          />
        );
      case 1:
        return (
          <AddressForm
            addressType={'Billing'}
            billingAddress={billingAddress}
            handleInfoChange={this.handleInfoChange}
          />
        );
      case 2:
        return <PaymentForm paymentInfo={paymentInfo} handleInfoChange={this.handleInfoChange} />;
      case 3:
        return (
          <ReviewCheckout
            purchasedItems={purchasedItems}
            shippingAddress={shippingAddress}
            billingAddress={billingAddress}
            paymentInfo={paymentInfo}
            checked={checked}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  };

  handleStep = (num) => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + num,
    });
  };

  handleInfoChange = (e, infoType) => {
    const newInfo = { ...this.state[infoType] };
    newInfo[e.target.name] = e.target.value;
    this.setState({ [infoType]: newInfo }, () => {
      this.copyAddress();
    });
  };

  handleCheckboxChange = (e) => {
    this.setState({ checked: e.target.checked }, () => {
      this.copyAddress();
    });
  };

  copyAddress = () => {
    // Copies shipping address to billing address, if checkbox is checked, but will not allow for changes to be made
    // directly in billing address.  If checkbox is unchecked, the information is still retained.
    if (this.state.checked) {
      const addressToCopy = { ...this.state.shippingAddress };
      this.setState({
        billingAddress: addressToCopy,
      });
    }
  };

  render() {
    const { activeStep } = this.state;
    const steps = this.getSteps();

    const toShopLink = (props) => <Link to="/shop" {...props} />;

    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={12}>
            <Typography className="shoppingCartTitle-padding" variant="h4" component="h2" align="center">
              Checkout
            </Typography>
          </Grid>
          <Grid item md={1} lg={2} xl={3} />
          <Grid item xs={12} s={12} md={10} lg={8} xl={6}>
            <main className="checkout--display">
              <Paper className="checkout__paper--sizing">
                <Stepper className="stepper--padding" activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <div>
                  {activeStep === steps.length ? (
                    <React.Fragment>
                      <Typography variant="h5" gutterBottom>
                        Thank you for your order.
                      </Typography>
                      <Typography variant="subtitle1">
                        Your order number is ___. We hav emailed your order confirmation, and will send you an update
                        when your order has shipped.
                      </Typography>
                      <div className="button--display">
                        <Button
                          variant="contained"
                          color="primary"
                          className="checkout__button--margin"
                          aria-label="Back to Shop"
                          component={toShopLink}
                        >
                          Back to Shop
                        </Button>
                      </div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {this.getStepContent(activeStep)}
                      <div className="button--display">
                        {/* a way to hide buttons using activeStep state and && operator */}
                        {activeStep !== 0 && (
                          <Button className="checkout__button--margin" onClick={() => this.handleStep(-1)}>
                            Back
                          </Button>
                        )}
                        <Button
                          variant="contained"
                          color="primary"
                          className="checkout__button--margin"
                          onClick={() => this.handleStep(1)}
                        >
                          {/* a way to conditionally render the text of the button.
                      Will need to change to properly place order and clear cart */}
                          {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                        </Button>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </Paper>
            </main>
          </Grid>
          <Grid item md={1} lg={2} xl={3} />
        </Grid>
      </React.Fragment>
    );
  }
}

export default Checkout;
