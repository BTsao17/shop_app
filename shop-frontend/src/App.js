import React, { Component } from 'react'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import { Home, Shop } from './components'
import axios from 'axios'

class App extends Component {
	state = {
		username: '',
		loggedIn: false,
	}

	updateName = (e) => {
		e.preventDefault()
		const name = e.target.name.value
		this.setState(
			{
				username: name,
				loggedIn: true,
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
				loggedIn: true,
			})
		}
	}

	logOut = () => {
		localStorage.clear()
		this.setState(
			{
				username: '',
				loggedIn: false,
			},
			() => this.clearCart()
		)
	}

	clearCart = () => {
		axios.post('http://localhost:8080/clear', []).then((response) => {
			console.log(response.data)
		})
	}

	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
					<span className="navbar-brand text-warning">Stationery Emporium</span>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#mainNavBar"
						aria-controls="mainNavBar"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="mainNavBar">
						<ul className="navbar-nav">
							<li className="nav-item active">
								<Link to="/" className="text-light">
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/shop" className="text-light">
									Shop
								</Link>
							</li>
						</ul>
					</div>
				</nav>

				<Switch>
					<Route
						path="/"
						exact
						render={() => {
							return this.state.loggedIn ? <Redirect to="/shop" /> : <Home updateName={this.updateName} />
						}}
					/>
					<Route
						path="/shop"
						render={(renderProps) => {
							return this.state.loggedIn ? (
								<Shop
									username={this.state.username}
									loggedIn={this.state.loggedIn}
									logOut={this.logOut}
									{...renderProps}
								/>
							) : (
								<Redirect to="/" exact />
							)
						}}
					/>
				</Switch>
			</div>
		)
	}
}

export default App
