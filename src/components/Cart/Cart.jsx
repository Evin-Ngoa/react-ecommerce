import React from 'react'
import { Container, Typography, Button, Grid } from  '@material-ui/core'
import useStyles from './styles'
import CartItem from './CartItem/CartItem'
import { Link } from 'react-router-dom'

const Cart = ({ cart }) => {

    const classes = useStyles();

    // check if the cart hasOwnProperty line_items
    if(!cart.line_items) return 'Loading... '  

    const EmptyCart = () => (
            <Typography variant="subtitle1">
                Cart is empty 
                <Link to="/" className={classes.link}>Continue Shopping</Link>
            </Typography>
    )

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {
                cart.line_items.map((item) =>(
                    <Grid item key={item.id} sm={4} >
                        <CartItem item={item} />
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
        <Container className={classes.cartContainer}>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h4" gutterBottom>
                Your Shopping Cart
            </Typography>
            {/* !0 is false check if empty */}
            { !cart.line_items.length ? <EmptyCart/> : <FilledCart /> }
        </Container>
    )
}

export default Cart
