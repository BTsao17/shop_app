import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { ProductsList, Cart } from './'
import axios from 'axios'

class Shop extends Component {
	state = {
		inkProducts: [],
		penProducts: [],
		shoppingCart: []
	}

	addItemToCart = (itemInfo) => {
		console.log(itemInfo)

		// let newCart = this.state.shoppingCart.concat([ itemInfo ])
		// this.setState({
		// 	shoppingCart: newCart
		// })
    
    const findDuplicate = this.state.shoppingCart.find((product) => {
      return product.name === itemInfo.name
    })

    //using truthy/falsy value of the return of fundDuplicate (.find will return undefined if no match found, otherwise will return the first value that satisfies it)
		if (!findDuplicate) {
			const newCart = this.state.shoppingCart.concat([ { ...itemInfo, quantity: 1 } ])
			console.log(newCart)

			this.setState({
				shoppingCart: newCart
			})
		}
		else {
			const newCart = this.state.shoppingCart.map((product) => {
				if (product.name === itemInfo.name) {
					product = { ...product, quantity: product.quantity + 1 }
					return product
				}
				else {
					return product
				}
			})
			console.log(newCart)

			this.setState({
				shoppingCart: newCart
			})
		}
	}

	componentDidUpdate() {
		axios.post('http://localhost:8080/cart', this.state.shoppingCart).then((response) => {
			console.log(response.data)
		})
	}

	componentDidMount() {
		//attempt at putting products in server - I did it separate from the shopping cart
		axios.get('http://localhost:8080/products').then((response) => {
			console.log(response.data)
			this.setState({
				inkProducts: response.data.inkProducts,
				penProducts: response.data.penProducts
			})
		})

		axios.get('http://localhost:8080/cart').then((response) => {
			console.log(response.data) //forgot to delete this console.log
			this.setState({
				shoppingCart: response.data
			})
		})
	}

	render() {
		const { match } = this.props
		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<h1 className="text-center">The Shop</h1>
						<h2 className="text-center">Welcome {this.props.username}! </h2>
						<h5 className="text-center">
							Not {this.props.username}?
							<button className="btn btn-secondary" type="submit" onClick={() => this.props.logOut()}>
								Logout
							</button>
						</h5>
						<h4 className="text-center">
							<span>Are you looking for.....</span>
							<Link to={match.url + '/fountain_pens'}>Fountain Pens</Link>
							<span> or </span>
							<Link to={match.url + '/inks'}>Inks</Link>
							<span>? </span>
						</h4>
					</div>
				</div>

				<Switch>
					<Route
						path={match.path + '/fountain_pens'}
						render={() => {
							return (
								<ProductsList
									category="Fountain Pens"
									products={this.state.penProducts}
									addItemToCart={this.addItemToCart}
								/>
							)
						}}
					/>
					<Route
						path={match.path + '/inks'}
						render={() => {
							return (
								<ProductsList category="Inks" products={this.state.inkProducts} addItemToCart={this.addItemToCart} />
							)
						}}
					/>
				</Switch>

				<Cart purchaseItems={this.state.shoppingCart} />
			</div>
		)
	}
}

export default Shop
