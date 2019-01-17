import React, { Component } from 'react'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
// import './App.css'
import { Home, Shop, Header } from './components'
import axios from 'axios'
import { CssBaseline } from '@material-ui/core'

class App extends Component {
	state = {
		username: '',
		loggedIn: false
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

	render() {
		return (
			<React.Fragment>
				<CssBaseline />
				<Header logOut={this.logOut} />
				{/* <nav>
					<span>Stationery Emporium</span>
					<div>
						<ul>
							<li>
								<Link to="/">
									Home
								</Link>
							</li>
							<li>
								<Link to="/shop">
									Shop
								</Link>
							</li>
						</ul>
					</div>
				</nav> */}

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
									// logOut={this.logOut}
									{...renderProps}
								/>
							) : (
								<Redirect to="/" exact />
							)
						}}
					/>
				</Switch>
			</React.Fragment>
		)
	}
}

export default App
