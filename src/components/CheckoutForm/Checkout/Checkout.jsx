import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from  '@material-ui/core';
import useStyles from './styles'
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import Confirmation from '../Confirmation';
import { commerce } from '../../../lib/commerce';

const Checkout = ({ cart }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState(null);
    const steps = ['Shipping Address', 'Payment Details'];

    useEffect(() => {
        // You cant use useEffect with sync and so you have a new function inside it

        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' } );

                console.log("token", token)

                setCheckoutToken(token)
            } catch (error) {
                
            }
        }

        generateToken();
    }, [])

    // Based on the previous step. You are changing the current state.
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);

        nextStep();
    }
    
    // If step is 0 then show address form else show payment form
    const Form = () => activeStep === 0 ? <AddressForm next={next} checkoutToken={checkoutToken} /> : <PaymentForm checkoutToken={checkoutToken} />

    return (
        <>
            {/* content below navbar */}
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {/* If its at the last step, then show confirmation component */}
                    {/* Only render the form if we have checkoutToken set */}
                    {activeStep === steps.length ? <Confirmation/>  : checkoutToken && <Form /> }
                </Paper>
            </main>
        </>
    )
}

export default Checkout
