import React from 'react'
import { Container, Typography, Button, Grid } from  '@material-ui/core'
import useStyles from './styles'

const Cart = ({ cart }) => {

    const classes = useStyles();

    // check if the cart hasOwnProperty line_items
    if(!cart.line_items) return 'Loading... '  

    const EmptyCart = () => (
            <Typography variant="subtitle1">
                Cart is empty
            </Typography>
    )

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {
                cart.line_items.map((item) =>(
                    <Grid item key={item.id} sm={4} >
                        <div>{item.name} </div>
                    </Grid>
                ))
                
                }
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Sub Total: 
                    {
                        cart.subtotal.formatted_with_symbol
                    }
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary">Empty Cart</Button>
                    <Button className={classes.checkoutButton} size="large" type="button" variant="contained"  color="primary">Checkout</Button>
                </div>

            </div>
        </>
    )
    

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3">
                Your Shopping Cart
            </Typography>
            {/* !0 is false check if empty */}
            { !cart.line_items.length ? <EmptyCart/> : <FilledCart /> }
        </Container>
    )
}

export default Cart
