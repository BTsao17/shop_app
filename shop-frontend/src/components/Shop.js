import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ProductsList, ShopNavBar } from './'
import axios from 'axios'
import '../css/Shop.css'

import PropTypes from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'

// const styles = {
// 	shopNavMargin: {
//     marginTop: 64
//   }, 
//   welcomePadding: {
//     paddingTop: 145, 
//     paddingBottom: 10
//   }
// }

class Shop extends Component {
	state = {
		inkProducts: [],
		penProducts: [],
	}

	componentDidMount() {
		axios.get('http://localhost:8080/products').then((response) => {
			this.setState({
				inkProducts: response.data.inkProducts,
				penProducts: response.data.penProducts
			})
		})
	}

	render() {
		const { match, classes } = this.props

		return (
			<div>
            {/* tabbed menu for products using components*/}
            {/* need to pass this.props.match down because need the url and path info of the renderProps */}
            <ShopNavBar match={match} 
            // classes={classes} 
            /> 

						<Typography variant="h4" align="center" className='title--padding'>
							Welcome {this.props.username}!
						</Typography>
					
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
			</div>
		)
	}
}
// Shop.propTypes = {
// 	classes: PropTypes.object.isRequired
// }

export default Shop
// export default withStyles(styles)(Shop)
