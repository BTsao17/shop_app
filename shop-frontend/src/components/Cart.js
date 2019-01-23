import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Paper,
	Typography,
	Grid,
	Button
} from '@material-ui/core'
import { CartItem } from './'
import '../css/Cart.css'

const PST_Rate = 0.07
const GST_Rate = 0.05

class Cart extends Component {
	priceRow = (qty, unit) => {
		return qty * unit
	}

	render() {
		const { purchaseItems } = this.props

		const itemsList = purchaseItems.map((item) => {
			const itemSubtotal = this.priceRow(item.quantity, item.price).toFixed(2)
			return <CartItem key={item.name} item={item} itemSubtotal={itemSubtotal} removeItem={this.props.removeItem} />
		})

		const invoiceSubtotal = purchaseItems
			.map((item) => this.priceRow(item.quantity, item.price))
			.reduce((sum, i) => sum + i, 0)

		const calculateGST = GST_Rate * invoiceSubtotal
		const calculatePST = PST_Rate * invoiceSubtotal
		const invoiceTotal = invoiceSubtotal + calculateGST + calculatePST

		return (
			<div>
				<Grid container>
					<Grid item xs={12}>
						<Typography className="titlePadding" variant="h4" component="h2" align="center">
							Shopping Cart
						</Typography>
					</Grid>
					<Grid item md={1} lg={2} xl={3} />
					<Grid item xs={12} s={12} md={10} lg={8} xl={6}>
						<div className="cart--display">
							<Paper className="cart__paper--sizing">
								<Table className="cart__paper__table--width">
									<TableHead>
										<TableRow>
											<TableCell>Product Name</TableCell>
											<TableCell align="right">Quantity</TableCell>
											<TableCell align="right">Unit Price</TableCell>
											<TableCell align="right">Price</TableCell>
											<TableCell />
										</TableRow>
									</TableHead>
									<TableBody>
										{itemsList}
										<TableRow>
											<TableCell rowSpan={5} />
											<TableCell colSpan={2}>Subtotal</TableCell>
											<TableCell align="right">${invoiceSubtotal.toFixed(2)}</TableCell>
											<TableCell />
										</TableRow>
										<TableRow>
											<TableCell>GST</TableCell>
											<TableCell align="right">{(GST_Rate * 100).toFixed(0)} %</TableCell>
											<TableCell align="right">${calculateGST.toFixed(2)}</TableCell>
											<TableCell />
										</TableRow>
										<TableRow>
											<TableCell>PST</TableCell>
											<TableCell align="right">{(PST_Rate * 100).toFixed(0)} %</TableCell>
											<TableCell align="right">${calculatePST.toFixed(2)}</TableCell>
											<TableCell />
										</TableRow>
										<TableRow>
											<TableCell colSpan={2}>Total</TableCell>
											<TableCell align="right">${invoiceTotal.toFixed(2)}</TableCell>
											<TableCell />
										</TableRow>
									</TableBody>
								</Table>
								<div className="button--display">
										<Button variant="outlined" size="small" className="button--margin" component={Link} to="/shop">
											Continue Shopping
										</Button>
										<Button variant="contained" size="small" className="button--margin" color="primary">
											Proceed to Checkout
										</Button>
								</div>
							</Paper>
						</div>
					</Grid>
					<Grid item md={1} lg={2} xl={3} />
				</Grid>
			</div>
		)
	}
}

export default Cart
