import React from "react";
import { Grid } from '@material-ui/core'
import Product from "./Product/Product";


const products = [
    { id: 1, name: 'Shoes', description: 'Running Shoes', price: '$5', image: 'https://ke.jumia.is/cms/2021/BlackFriday/Live/Day9/Freelinks/Staying-Fit.png'},
    { id: 2, name: 'MacBook', description: 'Apple MacBook', price: '$4', image:'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/77/880153/1.jpg?4990'},
];

const Products = () => {
    return (
        <main>
            <Grid container justify="center" spacing={4}>
                {
                    products.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <Product product={product} />
                        </Grid>
                    ))
                }
            </Grid>
        </main>
    )
}

export default Products;