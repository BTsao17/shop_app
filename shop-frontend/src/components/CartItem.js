import React from 'react'

import { TableCell, TableRow } from '@material-ui/core'

const CartItem = (props) => {
	const { item , itemSubtotal} = props

	return (
		<TableRow>
			<TableCell>{props.item.name}</TableCell>
			<TableCell align="right">{item.quantity}</TableCell>
			<TableCell align="right">${item.price.toFixed(2)}</TableCell>
			<TableCell align="right">${itemSubtotal}</TableCell>
		</TableRow>

		// <div className="col-sm-6 col-md-4 col-lg-4">
		// 	<ul>
		// 		<li>
		// 			Item: {props.item.name} <br />
		// 			Price: ${props.item.price.toFixed(2)} <br />
		// 			Type: {props.item.type} <br />
		//       Quantity: {props.item.quantity} <br />
		// 		</li>
		// 	</ul>
		// </div>
	)
}

export default CartItem
