import React, { Component } from 'react'
import {
	Grid,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
} from '@material-ui/core'

class Product extends Component {
	addToCart = (e) => {
		this.props.addItemToCart(this.props.item)
	}

	render() {
		const { item } = this.props

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

export default Product