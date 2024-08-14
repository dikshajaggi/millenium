import React, { createContext, useEffect, useState } from 'react'
import axios from "axios"
import { getAllProducts } from '../apis'


const MainContext = createContext()

const MainContextProvider = ({children}) => {
    const [token, setToken] = useState("")
    const [products, setProducts] = useState([{
        id: "1",
        name: "metal brackets kit",
        description: "description for this product. description for this product",
        price: 1600,
        image: "productImage",
        stock: 60,
        qty: 1,
        category: "brackets"
    }, {
        id: "2",
        name: "arch wire",
        description: "description for this product. description for this product",
        price: 2000,
        image: "productImage",
        stock: 40,
        qty: 1,
        category: "wires and springs"
    }, {
        id: "3",
        name: "archwire another",
        description: "description for this product. description for this product",
        price: 2200,
        image: "productImage",
        stock: 50,
        qty: 1,
        category: "wires and springs"
    }, {
        id: "4",
        name: " brackets kit",
        description: "description for this product. description for this product",
        price: 2000,
        image: "productImage",
        stock: 60,
        qty: 1,
        category: "brackets"
    },
    {
        id: "5",
        name: "bird beak plier",
        description: "description for this product. description for this product",
        price: 2000,
        image: "productImage",
        stock: 60,
        qty: 1,
        category: "pliers"
    },
    {
        id: "6",
        name: "cheek retractor",
        description: "description for this product. description for this product",
        price: 2000,
        image: "productImage",
        stock: 60,
        qty: 1,
        category: "miscellaneous"
    },
    {
        id: "7",
        name: "bird beak plier",
        description: "description for this product. description for this product",
        price: 2000,
        image: "productImage",
        stock: 60,
        qty: 1,
        category: "pliers"
    },
    {
        id: "8",
        name: "cheek retractor",
        description: "description for this product. description for this product",
        price: 2000,
        image: "productImage",
        stock: 60,
        qty: 1,
        category: "miscellaneous"
    }])

    const fetchProductList = async () => {
        const products = await getAllProducts()
        console.log(products, "products")
        setProducts(products)
    }

    useEffect(() => {
        async function loadData () {
            await fetchProductList()
        }
        loadData()
        
        // when we reload the webpage, the token should set again, otherwise the user will get logged-out
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
        }
    }, [])

  return (
    <MainContext.Provider
    value={{
        token,
        setToken,
        products,
        setProducts
    }}>
        {children}
    </MainContext.Provider>
  )
}

export { MainContextProvider, MainContext }