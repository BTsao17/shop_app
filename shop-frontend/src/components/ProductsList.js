import React, { Component } from 'react'
import { Product } from './'

class ProductsList extends Component {
	render() {
		const productList = this.props.products.map((product) => {
			return <Product key={product.name} item={product} addItemToCart={this.props.addItemToCart} />
		})

		return (
			<div>
				<div className="row">
					<div className="col">
						<h2 className="text-center">{this.props.category}</h2>
					</div>
				</div>
				<div className="row">{productList}</div>
			</div>
		)
	}
}

export default ProductsList
