import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography, withStyles, FormControl, Input, InputLabel, Button } from '@material-ui/core'

import '../css/Home.css'

// const styles = {
// 	welcomePadding: {
// 		paddingTop: 75
// 	},
// 	loginForm: {
// 		display: 'flex',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		width: '100%'
// 	}
// }

const Home = (props) => {
	// const { classes } = props

	return (
		<div>
			<Grid container>
				<Grid item xs={12}>
					<Typography variant="h2" align="center" gutterBottom className='welcomePadding'>
						Welcome to The Stationery Emporium
					</Typography>
				</Grid>
				<Grid item xs={'auto'} sm={3} md={3} lg={4} xl={4} />
				<Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
					<Typography variant="h4" align="center">
						Please Enter Your Name
					</Typography>
					<form className='loginForm' onSubmit={props.updateName}>
						<FormControl required margin="normal">
							<InputLabel htmlFor="name">Name</InputLabel>
							<Input type="text" name="name" autoFocus />
						</FormControl>
						<Button type="submit" variant="outlined">
							Enter
						</Button>
					</form>
				</Grid>
				<Grid item xs={'auto'} sm={3} md={3} lg={4} xl={4} />
			</Grid>
		</div>
	)
}

Home.propTypes = {
	classes: PropTypes.object.isRequired
}

// export default withStyles(styles)(Home)
export default Home