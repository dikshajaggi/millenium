import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import MainLayout from "../MainLayout";
import Signup from "../pages/Signup";
import Blog from "../pages/footer/Blog";
import Contact from "../pages/footer/Contact";
import TnC from "../pages/footer/TnC";
import About from "../pages/footer/About";
import Cart from "../pages/Cart"
import Offers from "../pages/Offers"
import SpecificProductPage from "../pages/SpecificProductPage";
import PlaceOrder from "../pages/PlaceOrder";
import SpecificCategory from "../pages/SpecificCategory";

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
                path: "/product/:product",
                element: <SpecificProductPage />
            },
            {
                path: "/category/:category",
                element: <SpecificCategory />
            },
            {
                path: "/place-order",
                element: <PlaceOrder />
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
    }
])