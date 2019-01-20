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
	withStyles,
	FormHelperText
} from '@material-ui/core'

const styles = {
	card: {
		maxWidth: 370
	},
	media: {
		objectFit: 'cover'
	},
	root: {
		display: 'inlineBlock'
	},
	cardContent: {
		minHeight: 140
	}
}

class Product extends Component {
	addToCart = (e) => {
		this.props.addItemToCart(this.props.item)
	}

	render() {
		const { classes, item } = this.props

		return (
			<React.Fragment>
				<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
					<Card className={(classes.card, classes.root)}>
						<CardMedia
							component="img"
							alt={item.name}
							className={classes.media}
							image={item.picture}
							title={item.name}
						/>
						<CardContent className={classes.cardContent}>
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

					{/* <div className="card">
						<img className="card-img-top img-fluid" src={this.props.item.picture} alt={this.props.item.name} />
						<div className="card-body">
							<h5 className="card-title">{this.props.item.name}</h5>
							<p className="card-text">Price: ${this.props.item.price.toFixed(2)}</p>
							<button onClick={this.addToCart}>Add to Cart</button>
						</div>
					</div> */}
				</Grid>
			</React.Fragment>
		)
	}
}
Product.propTypes = {
	classes: PropTypes.object.isRequired
}

// export default Product
export default withStyles(styles)(Product)
