import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from  '@material-ui/core';
import useStyles from './styles'
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState(null);
    const steps = ['Shipping Address', 'Payment Details'];
    const history = useNavigate();

    useEffect(() => {
        // You cant use useEffect with sync and so you have a new function inside it

        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' } );

                // console.log("token", token)

                setCheckoutToken(token)
            } catch (error) {
                // redirect to home if refresh from checkout url
                // that require token from checkouts
                history('/')
            }
        }

        generateToken();
    }, [])

    let Confirmation = () => (order.customer ? (
        <>
          <div>
            <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
          </div>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
      ) : (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ));
    
      if (error) {
        Confirmation = () => (
          <>
            {/* <Typography variant="h5">Error: {error}</Typography> */}
            <Typography variant="h5">Error: {error}. Payment Not Activated! I dont want to steal your money :) </Typography>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
          </>
        );
      }

    // Based on the previous step. You are changing the current state.
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        // console.log("setShippingData",data)
        setShippingData(data);

        nextStep();
    }
    
    // If step is 0 then show address form else show payment form
    const Form = () => activeStep === 0 ? <AddressForm next={next} checkoutToken={checkoutToken} /> : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} />

    return (
        <>
           <CssBaseline/>
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
