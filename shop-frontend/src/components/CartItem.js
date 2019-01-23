import React from 'react'

import { TableCell, TableRow, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const CartItem = (props) => {
	const { item, itemSubtotal } = props

	return (
		<TableRow>
			<TableCell>{props.item.name}</TableCell>
			<TableCell align="right">{item.quantity}</TableCell>
			<TableCell align="right">${item.price.toFixed(2)}</TableCell>
			<TableCell align="right">${itemSubtotal}</TableCell>
			<TableCell>
				<IconButton aria-label="Delete" onClick={()=> {props.removeItem(item)}}>
					<DeleteIcon fontSize="small" />
				</IconButton>
			</TableCell>
		</TableRow>
	)
}

export default CartItem
