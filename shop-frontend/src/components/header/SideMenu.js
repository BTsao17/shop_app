import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';

const SideMenu = (props) => {
  return (
    <div className="sideMenuList">
      <List component="nav">
        <SideMenuLink to="/" primary="Home" />
        <SideMenuLink to="/shop" primary="Shop" />
      </List>
      <Divider />
      {/* links below will have to be conditionally rendered depending on login status */}
      <List component="nav">
        {/* <SideMenuLink to="/login" primary="Login" />
					<SideMenuLink to="/signup" primary="New Customer? Register Here" />
					<SideMenuLink to="/account" primary="Account" /> */}
        <ListItem button onClick={() => props.logOut()}>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
};

const SideMenuLink = (props) => {
  const { primary, to } = props;
  return (
    <React.Fragment>
      <ListItem button component={Link} to={to}>
        <ListItemText primary={primary} />
      </ListItem>
    </React.Fragment>
  );
};
SideMenuLink.propTypes = {
  primary: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default SideMenu;
