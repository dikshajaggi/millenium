import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import MainLayout from "../MainLayout";
import Signup from "../pages/Signup";
import About from "../pages/footer/About";
import Cart from "../pages/Cart"
import Offers from "../pages/Offers"
import SpecificProductPage from "../pages/SpecificProductPage";
import PlaceOrder from "../pages/PlaceOrder";
import SpecificCategory from "../pages/SpecificCategory";
import TermsConditions from "../pages/footer/TermsConditions";
import PrivacyPolicy from "../pages/footer/PrivacyPolicy";
import Support from "../pages/footer/Support";
import ForgotPassword from "../pages/ForgotPassword";

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
                element: <TermsConditions />
            },
            {
                path: "/support",
                element: <Support />
            },
            {
                path: "/privacy_policy",
                element: <PrivacyPolicy />
            },
            {
                path: '/forgot-password',
                element: <ForgotPassword />
            }
        ]
    }
])