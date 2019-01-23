import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { AppBar, Tabs, Tab } from '@material-ui/core'

class ShopNavBar extends Component {
	state = {
		value: false
	}

	handleChange = (e, value) => {
		this.setState({ value })
	}

	render() {
		const { match } = this.props
		const { value } = this.state

		return (
			<React.Fragment>
				<AppBar className="shop__nav--margin" color="default">
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
				</AppBar>
			</React.Fragment>
		)
	}
}

const ProductLinkTab = (props) => {
	const { to } = props
	return <Tab component={Link} to={to} {...props} />
}
ProductLinkTab.propTypes = {
	to: PropTypes.string.isRequired
}

export default ShopNavBar
