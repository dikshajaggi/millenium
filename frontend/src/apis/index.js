import axios from "axios"

const baseUrl = "http://localhost:5000"


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