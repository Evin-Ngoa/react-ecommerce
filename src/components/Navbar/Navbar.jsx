import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core'

import logo from '../../assets/ecommerce.png'
import { ShoppingCart } from '@material-ui/icons'

import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Evin Ecommmerce" height="25px" className={classes.image} />
                        Evin Ecommerce
                    </Typography>
                    {/* SPace in between */}
                    <div className={classes.grow} />
                    {/* Right Side */}
                    <div className={classes.button} >
                        <IconButton aria-label="Show Cart Items" color="inherit">
                            <Badge badgeContent={2} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
