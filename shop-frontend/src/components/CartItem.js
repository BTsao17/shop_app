import React from 'react'

const CartItem = (props) => (
	<div className="col-sm-6 col-md-4 col-lg-4">
		<ul>
			<li>
				Item: {props.item.name} <br />
				Price: ${props.item.price.toFixed(2)} <br />
				Type: {props.item.type} <br />
        Quantity: {props.item.quantity} <br />
			</li>
		</ul>
	</div>
)

export default CartItem
