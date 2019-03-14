import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, Badge, Drawer, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import SideMenu from './SideMenu';

class Header extends Component {
  state = {
    left: false,
  };

  toggleSideMenu = (open) => () => {
    this.setState({
      left: open,
    });
  };

  render() {
    const { logInStatus, logOut } = this.props;

    //to avoid property collision and unexpected un-mounting with using inline: component={Link} to='/cart'
    const toShoppingCartLink = (props) => <Link to="/cart" {...props} />;
    const toShopLink = (props) => <Link to="/shop" {...props} />;

    return (
      <React.Fragment>
        <div className="navBar--root">
          <AppBar>
            <Toolbar>
              {logInStatus === true && (
                <React.Fragment>
                  <Hidden mdUp>
                    <IconButton
                      onClick={this.toggleSideMenu(true)}
                      className="menuButton"
                      color="inherit"
                      aria-label="Menu"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Drawer open={this.state.left} onClose={this.toggleSideMenu(false)}>
                      <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleSideMenu(false)}
                        onKeyDown={this.toggleSideMenu(false)}
                      >
                        <SideMenu logOut={this.props.logOut} />
                      </div>
                    </Drawer>
                  </Hidden>
                </React.Fragment>
              )}

              <Typography variant="h6" color="inherit" className="grow">
                The Stationery Emporium
              </Typography>

              {logInStatus === true && (
                <React.Fragment>
                  <Hidden smDown>
                    <Button
                      className="shopPageButton--spacing"
                      color="inherit"
                      aria-label="Shop Page"
                      component={toShopLink}
                    >
                      Shop
                    </Button>
                    <Button
                      className="logOutButton--spacing"
                      color="inherit"
                      aria-label="Log Out"
                      onClick={() => logOut()}
                    >
                      Logout
                    </Button>
                  </Hidden>
                  <IconButton
                    color="inherit"
                    className="cartButton"
                    aria-label="Shopping Cart"
                    component={toShoppingCartLink}
                  >
                    <Badge badgeContent={this.props.quantityInCart} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </React.Fragment>
              )}
            </Toolbar>
          </AppBar>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
