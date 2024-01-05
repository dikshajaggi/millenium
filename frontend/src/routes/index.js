import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import SpecificProduct from "../pages/SpecificProduct";
import ProductPage from "../pages/ProductPage";
import Offers from "../pages/Offers";
import MainLayout from "../MainLayout";
import Signup from "../pages/Signup";
import Blog from "../pages/footer/Blog";
import Contact from "../pages/footer/Contact";
import TnC from "../pages/footer/TnC";
import About from "../pages/footer/About";

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
                path: "/signup",
                element: <Signup />
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
                path: "/product/:product/:id",
                element: <SpecificProduct />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/terms_conditions",
                element: <TnC />
            }, 
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/blog",
                element: <Blog />
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