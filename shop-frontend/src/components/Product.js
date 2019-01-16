import React, { Component } from 'react'

class Product extends Component {
	addToCart = (e) => {
		// rather than sending just parts of the product up, just send the whole thing up in a new object
		//that way you won't need to find this item in the array to grab all the other info

		//this.props.addItemToCart(e.target.value, this.props.type)

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
						<button
							onClick={this.addToCart}
							// value={this.props.name}
						>
							Add to Cart
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Product
