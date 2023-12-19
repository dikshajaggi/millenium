import React from 'react'
import Product_Card from './layout_components/Product_Card'
import "./styles.scss"

// const getRandomProducts = () => {
//     // Shuffle the products array and get the first 8 items
//     const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
//     const selectedProducts = shuffledProducts.slice(0, 8);
//     return selectedProducts;
// };

// const randomProducts = getRandomProducts();


const Products = () => {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2vw", margin: "4vh auto", flexWrap: "wrap", flexBasis: "33.33%" }}>
            <Product_Card />
            <Product_Card />
            <Product_Card />
            <Product_Card />
            <Product_Card />
            <Product_Card />
            <Product_Card />
            <Product_Card />
        </div>
    )
}

export default Products
