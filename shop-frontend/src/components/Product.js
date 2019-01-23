import React, { Component } from 'react'

import PropTypes from 'prop-types'
import {
	Grid,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	withStyles
} from '@material-ui/core'

// const styles = {
// 	card: {
// 		maxWidth: 370
// 	},
// 	media: {
// 		objectFit: 'cover'
// 	},
// 	root: {
// 		display: 'inlineBlock'
// 	},
// 	cardContent: {
// 		minHeight: 140
// 	}
// }

class Product extends Component {
	addToCart = (e) => {
		this.props.addItemToCart(this.props.item)
	}

	render() {
		const { classes, item } = this.props

		return (
			<React.Fragment>
				<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
					<Card className='card--display'>
						<CardMedia
							component="img"
							alt={item.name}
							className='image--fit'
							image={item.picture}
							title={item.name}
						/>
						<CardContent className='cardContent--height'>
							<Typography gutterBottom variant="h6" component="h3">
								{item.name}
							</Typography>
							<Typography gutterBottom variant="body1" component="p">
								Price: ${item.price.toFixed(2)}
							</Typography>
						</CardContent>
						<CardActions>
							<Button size="small" onClick={this.addToCart}>
								Add to Cart
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</React.Fragment>
		)
	}
}
// Product.propTypes = {
// 	classes: PropTypes.object.isRequired
// }

export default Product
// export default withStyles(styles)(Product)
