import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../apis";
import { MainContext } from "../context/MainContext";
import { Eye, EyeOff } from "lucide-react";


const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { setToken } = useContext(MainContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (values) => {
    try {
      const response = await login(values);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back 👋</h2>
        <p className="text-center text-gray-500 mb-6">Login to continue shopping with us</p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {() => (
            <Form className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400"
                />
                <ErrorMessage name="email" component="div" className="text-sm text-red-500 mt-1" />
              </div>

              {/* Password Field */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="mt-1 w-full px-4 py-2 border rounded-lg pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>

                <ErrorMessage name="password" component="div" className="text-sm text-red-500 mt-1" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 bg-[#2D3092] text-white font-semibold rounded-lg hover:bg-opacity-80 transition-all duration-200"
              >
                Login
              </button>

              <div className="text-right mt-2">
                <Link to="/forgot-password" className="text-sm text-[#2D3092] hover:underline font-medium no-underline">
                  Forgot Password?
                </Link>
              </div>

              {/* Link to Sign Up */}
              <p className="text-center text-sm text-gray-600 mt-3">
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#2D3092] hover:underline font-medium no-underline">
                  Sign up
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
