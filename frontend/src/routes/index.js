import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import SpecificProduct from "../pages/SpecificProduct";
import ProductPage from "../pages/ProductPage";
import Offers from "../pages/Offers";
import MainLayout from "../MainLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <MainLayout />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/offers",
                element: <Offers />
            },
            {
                path: "/checkout",
                element: <Checkout />
            },
            {
                path: "/:category",
                element: <ProductPage />
            },
            {
                path: "/product/:product",
                element: <SpecificProduct />
            }
        ]
    },
    // {
    //     path: "/admin-login",
    //     element: <AdminLogin />
    // },
    // {
    //     path: "/inventory",
    //     element: <Inventory />
    // },
])