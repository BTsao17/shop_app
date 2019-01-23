import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { SideMenu } from './'
import PropTypes from 'prop-types'
import { withStyles, AppBar, Toolbar, Typography, IconButton, Badge, Drawer} from '@material-ui/core'
import { List, ListItem, ListItemText, Divider } from '@material-ui/core' //for Side Menu
import MenuIcon from '@material-ui/icons/Menu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined'

import '../css/Header.css'

// const styles = {
// 	root: {
// 		flexGrow: 1 //what exactly is flexGrow? Not sure if it's necessary here. 
// 	},
// 	grow: {
// 		flexGrow: 1 //flexGrow is a CSS property that has to do with flexbox 
// 	},
// 	menuButton: {
// 		marginLeft: -12,
// 		marginRight: 20
// 	},
// 	cartButton: {
// 		marginLeft: 10,
// 		marginRight: -12
// 	},
// 	list: {
//     width: 280, //side menu width
//   },
// }

class Header extends Component {
	state = {
		left: false
	}

	toggleSideMenu = (open) => () => {
		this.setState({
			left: open
		})
	}

	render() {
		const { classes } = this.props //don't know why other than to allow for inline styling to occur.

		//separate component for sideMenu
		// const sideMenu = (
		// 	<div className={classes.list}>
		// 		<List component="nav">
		// 			<SideMenuLink to="/" primary="Home" />
		// 			<SideMenuLink to="/shop" primary="Shop" />
		// 		</List>
		// 		<Divider />
		// 		{/* links below will have to be conditionally rendered depending on login status */}
		// 		<List component="nav">
		// 			{/* <SideMenuLink to="/login" primary="Login" />
		// 			<SideMenuLink to="/signup" primary="New Customer? Register Here" />
		// 			<SideMenuLink to="/account" primary="Account" /> */}
		// 			<ListItem button onClick={()=> this.props.logOut()}>
		// 			<ListItemText primary="Logout" />
		// 			</ListItem>
		// 		</List>
		// 	</div>
		// )

		return (
			<React.Fragment>
				<div className='navBar--root'>
					<AppBar>
						<Toolbar>
							<IconButton
								onClick={this.toggleSideMenu(true)}
								className='menuButton'
								color="inherit"
								aria-label="Menu"
							>
								<MenuIcon />
							</IconButton>

							{/* sideMenu Drawer*/}
              <Drawer 
              open={this.state.left} 
              onClose={this.toggleSideMenu(false)}
              >
								<div
									tabIndex={0}
									role="button"
									onClick={this.toggleSideMenu(false)}
									onKeyDown={this.toggleSideMenu(false)}
								>
                  {/* {sideMenu} */}
                  <SideMenu logOut={this.props.logOut} classes={classes} />
								</div>
							</Drawer>

							<Typography variant="h6" color="inherit" className='grow'>
								The Stationery Emporium
							</Typography>
							<IconButton color="inherit" className='cartButton' aria-label="Shopping Cart" component={Link} to='/cart'>
              {/* not sure if adding component={Link} is normal practice to allow icon buttons to work as links without onClick */}
								<Badge badgeContent={this.props.quantityInCart} color='secondary'>
                <ShoppingCartIcon />
                </Badge>
							</IconButton>
						</Toolbar>
					</AppBar>
				</div>
			</React.Fragment>
		)
	}
}
// Header.propTypes = {
// 	classes: PropTypes.object.isRequired
// }

// const SideMenu = (props) => {
//   const {classes} = props

//   return (
//     <div className='sideMenuList'>
// 				<List component="nav">
// 					<SideMenuLink to="/" primary="Home" />
// 					<SideMenuLink to="/shop" primary="Shop" />
// 				</List>
// 				<Divider />
// 				{/* links below will have to be conditionally rendered depending on login status */}
// 				<List component="nav">
// 					{/* <SideMenuLink to="/login" primary="Login" />
// 					<SideMenuLink to="/signup" primary="New Customer? Register Here" />
// 					<SideMenuLink to="/account" primary="Account" /> */}
// 					<ListItem button onClick={()=> props.logOut()}>
// 					<ListItemText primary="Logout" />
// 					</ListItem>
// 				</List>
// 			</div>
//   )
// }
// SideMenu.propTypes = {
//   classes: PropTypes.object.isRequired
// }


// //separate Component that is used under render for Links with React Router
// const SideMenuLink = (props) => {
// 	const { primary, to } = props
// 	return (
// 		<React.Fragment>
// 			<ListItem button component={Link} to={to}>
// 				<ListItemText primary={primary} />
// 			</ListItem>
// 		</React.Fragment>
// 	)
// }
// SideMenuLink.propTypes = {
// 	primary: PropTypes.node.isRequired,
// 	to: PropTypes.string.isRequired
// }

// export default withStyles(styles)(Header)
export default Header
