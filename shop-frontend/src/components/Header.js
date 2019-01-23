import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, IconButton, Badge, Drawer } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined'
import { SideMenu } from './'
import '../css/Header.css'

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
		return (
			<React.Fragment>
				<div className="navBar--root">
					<AppBar>
						<Toolbar>
							<IconButton onClick={this.toggleSideMenu(true)} className="menuButton" color="inherit" aria-label="Menu">
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

							<Typography variant="h6" color="inherit" className="grow">
								The Stationery Emporium
							</Typography>
							<IconButton color="inherit" className="cartButton" aria-label="Shopping Cart" component={Link} to="/cart">
								{/* not sure if adding component={Link} is normal practice to allow icon buttons to work as links without onClick */}
								<Badge badgeContent={this.props.quantityInCart} color="secondary">
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

export default Header
