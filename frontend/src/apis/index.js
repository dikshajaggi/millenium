import axios from "axios"

// const baseUrl = "http://localhost:5000"
const baseUrl = "https://millenium-orthodontics.onrender.com"


// -----------------auth---------------------------------------
export const signup = async(values) => {
    const data = await axios.post(`${baseUrl}/api/user/signup`, values)
    return data
}

export const login = async(values) => {
    const data = await axios.post(`${baseUrl}/api/user/login`, {email: values.email, password: values.password})
    return data
}
// -----------------products------------------------------------
export const getAllProducts = async() => {
    const products = await axios.get(`${baseUrl}/api/product/all`)
    return products.data.data
}

// -------------------cart--------------------------------------
export const getCart = async(config) => {
    const products = await axios.get(`${baseUrl}/api/cart/all`, config)
    return products
}

export const addingToCart = async(id, config) => {
    const response = await axios.post(`${baseUrl}/api/cart/add`, { itemid: id }, config)
    return response
}

export const removingFromCart = async(id, config) => {
    const response = await axios.post(`${baseUrl}/api/cart/remove`, { itemid: id }, config)
    return response
}

// ---------------------------place-order----------------------------------

export const placeorder = async(orderData, config) => {
    const response = await axios.post(`${baseUrl}/api/order/place-order`, orderData, config)
    return response
}

// ---------------------------categories----------------------------------

export const categoryWiseProducts = async(param) => {
    const response = await axios.get(`${baseUrl}/api/category/${param}`)
    return response
}

// -----------------------------search------------------------------------

export const searchAll = async(searchQuery) => {
    const response = await axios.get(`${baseUrl}/api/search/all`, {params: {productName: searchQuery}})
    return response
}

export const searchCategoryWise = async(searchQuery, category) => {
    const response = await axios.get(`${baseUrl}/api/search/category`, {params: {productName: searchQuery, category: category}})
    return response
}