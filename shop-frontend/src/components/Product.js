import React, { Component } from 'react'

class Product extends Component {
	addToCart = (e) => {
		this.props.addItemToCart(this.props.item)
	}

	render() {
		return (
			<div className="col-sm-6 col-md-4 col-lg-4">
				<div className="card">
					<img className="card-img-top img-fluid" src={this.props.item.picture} alt={this.props.item.name} />
					<div className="card-body">
						<h5 className="card-title">{this.props.item.name}</h5>
						<p className="card-text">Price: ${this.props.item.price.toFixed(2)}</p>
						<button onClick={this.addToCart}>Add to Cart</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Product
