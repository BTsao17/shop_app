import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// import './App.css'
import { Home, Shop, Header, Cart } from './components'
import axios from 'axios'
import { CssBaseline } from '@material-ui/core'

class App extends Component {
	state = {
		username: '',
		loggedIn: false,
		shoppingCart: []
	}

	updateName = (e) => {
		e.preventDefault()
		const name = e.target.name.value
		this.setState(
			{
				username: name,
				loggedIn: true
			},
			() => {
				localStorage.setItem('username', this.state.username)
			}
		)
	}

	componentDidMount() {
		const name = localStorage.getItem('username')

		if (name) {
			this.setState({
				username: name,
				loggedIn: true
			})
		}

		axios.get('http://localhost:8080/cart').then((response) => {
			this.setState({
				shoppingCart: response.data
			})
		})
	}

	componentDidUpdate() {
		axios.post('http://localhost:8080/cart', this.state.shoppingCart).then((response) => {
			console.log(response.data)
		})
	}

	logOut = () => {
		localStorage.clear()
		this.setState(
			{
				username: '',
				loggedIn: false
			},
			() => this.clearCart()
		)
	}

	clearCart = () => {
		axios.post('http://localhost:8080/clear', []).then((response) => {
			console.log(response.data)
		})
	}

	addItemToCart = (itemInfo) => {
		const findDuplicate = this.state.shoppingCart.find((product) => {
			return product.name === itemInfo.name
		})

		if (!findDuplicate) {
			const newCart = this.state.shoppingCart.concat([ { ...itemInfo, quantity: 1 } ])

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

			this.setState({
				shoppingCart: newCart
			})
		}
	}

	render() {
		const { username, loggedIn, shoppingCart } = this.state

		const quantityInCart = shoppingCart.reduce((accumulator, currentV) => {
			return accumulator + currentV.quantity
		}, 0)

		// console.log(quantityInCart)

		return (
			<React.Fragment>
				<CssBaseline />
				<Header logOut={this.logOut} quantityInCart={quantityInCart} />

				<Switch>
					<Route
						path="/"
						exact
						render={() => {
							return loggedIn ? <Redirect to="/shop" /> : <Home updateName={this.updateName} />
						}}
					/>
					<Route
						path="/shop"
						render={(renderProps) => {
							return loggedIn ? 
								<Shop
									username={username}
									loggedIn={loggedIn}
									{...renderProps}
									addItemToCart={this.addItemToCart}
								/>
							 : 
								<Redirect to="/" exact />
							
						}}
					/>
					<Route
						path="/cart"
						render={(renderProps) => {
							return loggedIn ? 
              <Cart 
              purchaseItems={shoppingCart} 
              {...renderProps} //might need this when I want to mock-up check-out
              /> : 
              <Redirect to="/" exact />
						}}
					/>
				</Switch>
			</React.Fragment>
		)
	}
}

export default App
