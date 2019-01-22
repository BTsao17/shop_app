import React, { Component } from 'react'
import { CartItem } from './'

import PropTypes from 'prop-types'
import {
	withStyles,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Paper,
	Typography,
	Grid
} from '@material-ui/core'

const PST_Rate = 0.07
const GST_Rate = 0.05

const styles = (theme) => ({
	root: {
		width: '90%',
		marginTop: theme.spacing.unit * 3,
		marginBottom: theme.spacing.unit * 5,
		overflowX: 'auto'
	},
	table: {
		minWidth: '50%',
		overflowX: 'auto'
	},
	display: {
		display: 'flex',
		justifyContent: 'center'
	}
})

class Cart extends Component {
	priceRow = (qty, unit) => {
		return qty * unit
	}

	render() {
		const { classes, purchaseItems } = this.props

		const itemsList = purchaseItems.map((item) => {
			const itemSubtotal = this.priceRow(item.quantity, item.price).toFixed(2)
			return <CartItem key={item.name} item={item} itemSubtotal={itemSubtotal} />
		})

		const invoiceSubtotal = purchaseItems
			.map((item) => this.priceRow(item.quantity, item.price))
			.reduce((sum, i) => sum + i, 0)

		const calculateGST = GST_Rate * invoiceSubtotal
		const calculatePST = PST_Rate * invoiceSubtotal
		const invoiceTotal = invoiceSubtotal + calculateGST + calculatePST

		const addTotalQuantity = purchaseItems.reduce((accumulator, currentV) => {
			return accumulator + currentV.quantity
		}, 0)

		return (
			<div>
				<Grid container>
					<Grid item xs={12}>
						<Typography variant="h4" component="h2" align="center">
							Shopping Cart ({addTotalQuantity})
						</Typography>
					</Grid>
					<Grid item md={1} lg={2} xl={3} />
					<Grid item xs={12} s={12} md={10} lg={8} xl={6}>
						<div className={classes.display}>
							<Paper className={classes.root}>
								<Table className={classes.table}>
									<TableHead>
										<TableRow>
											<TableCell>Product Name</TableCell>
											<TableCell align="right">Quantity</TableCell>
											<TableCell align="right">Unit Price</TableCell>
											<TableCell align="right">Price</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{itemsList}
										<TableRow>
											<TableCell rowSpan={4} />
											<TableCell colSpan={2}>Subtotal</TableCell>
											<TableCell align="right">${invoiceSubtotal.toFixed(2)}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>GST</TableCell>
											<TableCell align="right">{(GST_Rate * 100).toFixed(0)} %</TableCell>
											<TableCell align="right">${calculateGST.toFixed(2)}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>PST</TableCell>
											<TableCell align="right">{(PST_Rate * 100).toFixed(0)} %</TableCell>
											<TableCell align="right">${calculatePST.toFixed(2)}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell colSpan={2}>Total</TableCell>
											<TableCell align="right">${invoiceTotal.toFixed(2)}</TableCell>
										</TableRow>
									</TableBody>
								</Table>

								{/* <div id="shoppingCart">
				<div className="row">
					<div className="col">
						<h2 className="text-center">Shopping Cart ({addTotalQuantity})</h2>
					</div>
				</div>
				<div className="row">{itemsList}</div>
				<div className="row">
					<div className="col">
						<h4 className="text-center">Subtotal: {addSubtotal.toFixed(2)}</h4>
					</div>
				</div>
			</div> */}
							</Paper>
						</div>
					</Grid>
					<Grid item md={1} lg={2} xl={3} />
				</Grid>
			</div>
		)
	}
}
Cart.propTypes = {
	classes: PropTypes.object.isRequired
}

// export default Cart
export default withStyles(styles)(Cart)
