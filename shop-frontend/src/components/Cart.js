import React, { Component } from 'react'
import { CartItem } from './'

class Cart extends Component {
	render() {
		const itemsList = this.props.purchaseItems.map((item, i) => {
      return <CartItem 
      key={i} 
      item={item}
      />
		})

		const addSubtotal = this.props.purchaseItems.reduce((accumulator, currentV) => {
			return accumulator + currentV.price
		}, 0)

		return (
			<div id="shoppingCart">
				<div className="row">
					<div className="col">
						<h2 className="text-center">Shopping Cart ({this.props.purchaseItems.length.toString()})</h2>
					</div>
				</div>
				<div className="row">{itemsList}</div>
				<div className="row">
					<div className="col">
						<h4 className="text-center">Subtotal: {addSubtotal.toFixed(2)}</h4>
					</div>
				</div>
			</div>
		)
	}
}

export default Cart
