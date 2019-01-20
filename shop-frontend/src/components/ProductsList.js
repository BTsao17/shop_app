import React, { Component } from 'react'
import { Product } from './'

import PropTypes from 'prop-types'
import { Grid, withStyles } from '@material-ui/core'

const styles = {
	gridPadding: {
		padding: 40
	}
}

class ProductsList extends Component {
	render() {
		const { classes } = this.props

		const productList = this.props.products.map((product) => {
			return <Product key={product.name} item={product} addItemToCart={this.props.addItemToCart} />
		})

		return (
			<div>
				<Grid container spacing={24} className={classes.gridPadding}>
					{productList}
				</Grid>
			</div>
		)
	}
}
ProductsList.propTypes = {
	classes: PropTypes.object.isRequired
}

// export default ProductsList
export default withStyles(styles)(ProductsList)
