import axios from "axios"

const baseUrl = "http://localhost:5000"

export const getAllProducts = async() => {
    const products = await axios.get(`${baseUrl}/api/product/all`)
    return products.data.data
}