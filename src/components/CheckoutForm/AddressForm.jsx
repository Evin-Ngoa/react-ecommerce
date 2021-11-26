import React, { useState, useEffect } from 'react'
import { Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { commerce } from '../../lib/commerce';
import FormInput from './CustomTextInput/FormInput';
import FormSelect from './CustomTextInput/FormSelect';

const AddressForm = ({ checkoutToken, next }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    // Selected country
    const [shippingCountry, setShippingCountry] = useState('');

    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    // Selected subdivision
    const [shippingSubdivision, setShippingSubdivision] = useState('');

    const [shippingOptions, setShippingOptions] = useState([]);
    // Selected shipping option
    const [shippingOption, setShippingOption] = useState('');
    
    const methods = useForm();

    const processCountry = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));
    const processSubRegions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }));
    const processShippingOptions = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }));


    const getShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

        console.log(countries)

        setShippingCountries(countries);
        // countries is an object hence do the object.keys instead of countries[0]
        setShippingCountry(Object.keys(countries)[0]);
    };

    const getSubRegions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        console.log(subdivisions)
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    const getShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });

        setShippingOptions(options);
        setShippingOption(options[0].id);
    };

    useEffect(() => {
        getShippingCountries(checkoutToken.id);
    }, []);

    // If the shippingCountry changes then call getSubRegions
    useEffect(() => {
        // Check if not null
        if (shippingCountry) getSubRegions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        if (shippingSubdivision) getShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision]);

    return (
            <>
            <Typography variant="h6" gutterBottom>Shipping address</Typography>
            <FormProvider {...methods}>
                {/* ...data  from the form react hook form inputs plus the drop down*/}
                <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
               
                    <Grid container spacing={3}>
                        <FormInput  name="firstName" label="First name" />
                        <FormInput  name="lastName" label="Last name" />
                        <FormInput  name="address1" label="Address line 1" />
                        <FormInput  name="email" label="Email" />
                        <FormInput  name="city" label="City" />
                        <FormInput  name="zip" label="Zip / Postal code" />
                        <FormSelect 
                            label="Shipping Country" 
                            value={shippingCountry} 
                            onChange={(e) => setShippingCountry(e.target.value)} 
                            data={processCountry}
                            />
                        <FormSelect 
                            label="Shipping Subdivision" 
                            value={shippingSubdivision} 
                            onChange={(e) => setShippingSubdivision(e.target.value)} 
                            data={processSubRegions}
                            />
                        <FormSelect 
                            label="Shipping Options" 
                            value={shippingOption} 
                            onChange={(e) => setShippingOption(e.target.value)} 
                            data={processShippingOptions}
                            />
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
 