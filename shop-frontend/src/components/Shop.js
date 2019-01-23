import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'
import { Typography } from '@material-ui/core'
import { ProductsList, ShopNavBar } from './'
import '../css/Shop.css'

class Shop extends Component {
	state = {
		inkProducts: [],
		penProducts: []
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
		const { match } = this.props

		return (
			<div>
				{/* tabbed menu for products using components*/}
				{/* need to pass this.props.match down because need the url and path info of the renderProps */}
				<ShopNavBar match={match} />

				<Typography variant="h4" align="center" className="title--padding">
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

export default Shop
