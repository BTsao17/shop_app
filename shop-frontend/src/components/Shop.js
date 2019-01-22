import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { ProductsList, Cart } from './'
import axios from 'axios'

import PropTypes from 'prop-types'
import { Typography, withStyles, AppBar, Tabs, Tab } from '@material-ui/core'

const styles = {
	shopNavPadding: {
    paddingTop: 65
  }, 
  welcomePadding: {
    paddingTop: 40, 
    paddingBottom: 40
  }
}

class Shop extends Component {
	state = {
		inkProducts: [],
		penProducts: [],
		// shoppingCart: []
	}

	// addItemToCart = (itemInfo) => {
	// 	const findDuplicate = this.state.shoppingCart.find((product) => {
	// 		return product.name === itemInfo.name
	// 	})

	// 	if (!findDuplicate) {
	// 		const newCart = this.state.shoppingCart.concat([ { ...itemInfo, quantity: 1 } ])

	// 		this.setState({
	// 			shoppingCart: newCart
	// 		})
	// 	}
	// 	else {
	// 		const newCart = this.state.shoppingCart.map((product) => {
	// 			if (product.name === itemInfo.name) {
	// 				product = { ...product, quantity: product.quantity + 1 }
	// 				return product
	// 			}
	// 			else {
	// 				return product
	// 			}
	// 		})

	// 		this.setState({
	// 			shoppingCart: newCart
	// 		})
	// 	}
	// }

	// componentDidUpdate() {
	// 	axios.post('http://localhost:8080/cart', this.state.shoppingCart).then((response) => {
	// 		// console.log(response.data) 
	// 	})
	// }

	componentDidMount() {
		axios.get('http://localhost:8080/products').then((response) => {
			this.setState({
				inkProducts: response.data.inkProducts,
				penProducts: response.data.penProducts
			})
		})

		// axios.get('http://localhost:8080/cart').then((response) => {
		// 	this.setState({
		// 		shoppingCart: response.data
		// 	})
		// })
	}

	render() {
		const { match, classes } = this.props

		return (
			<div>
            {/* tabbed menu for products using components*/}
            {/* need to pass this.props.match down because need the url and path info of the renderProps */}
						<ShopNavBar match={match} classes={classes} /> 

						<Typography variant="h4" align="center" className={classes.welcomePadding}>
							Welcome {this.props.username}!
						</Typography>
						{/* <h5>
							Not {this.props.username}?
							<button type="submit" onClick={() => this.props.logOut()}>
								Logout
							</button>
						</h5>
						<h4>
							<span>Are you looking for.....</span>
							<Link to={match.url + '/fountain_pens'}>Fountain Pens</Link>
							<span> or </span>
							<Link to={match.url + '/inks'}>Inks</Link>
							<span>? </span>
						</h4> */}
					
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
									)
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
									)
								}}
							/>
						</Switch>
		
						{/* <Cart purchaseItems={this.state.shoppingCart} /> */}
			</div>
		)
	}
}
Shop.propTypes = {
	classes: PropTypes.object.isRequired
}

//Components for sub nav bar for Shop

//might not need this ShopTabContainer component since we're just routing to other pages rather than have text in the tabs
// const ShopTabContainer = (props) => {
// 	return (
// 		<Typography component="div">
// 			{props.children}
// 		</Typography>
// 	)
// }
// ShopTabContainer.propTypes = {
// 	children: PropTypes.node.isRequired
// }

const ProductLinkTab = (props) => {
	const { to } = props
	return <Tab component={Link} to={to} {...props} /> //not sure if {...props} is needed
}
ProductLinkTab.propTypes = {
	to: PropTypes.string.isRequired
}

class ShopNavBar extends Component {
	state = {
		value: false
	}

	handleChange = (e, value) => {
		this.setState({ value })
	}

	render() {
		const { match, classes } = this.props
		const { value } = this.state

		// console.log(match)

		return (
			<React.Fragment>
					<AppBar className={classes.shopNavPadding} position="static" color="default">
					<Tabs
								variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
								value={value}
								onChange={this.handleChange}
							>
								<ProductLinkTab value="fpen" label="Fountain Pens" to={match.url + '/fountain_pens'} />
								<ProductLinkTab value="ink" label="Inks" to={match.url + '/inks'} />
							</Tabs>
							{/* not working because of the match.url? since we said to requires string.
              or because Router Props?  Maybe try just putting this directly in the Shop component
              rather than separating it yet? */}
					</AppBar>
			</React.Fragment>
		)
	}
}

// export default Shop
export default withStyles(styles)(Shop)
