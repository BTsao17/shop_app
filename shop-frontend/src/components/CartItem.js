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
	)
}

export default CartItem
