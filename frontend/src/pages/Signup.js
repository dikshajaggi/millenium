import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { requestOtp, verifyOtp } from "../apis";
import { MainContext } from "../context/MainContext";
import { Eye, EyeOff } from "lucide-react";


const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  name: Yup.string().required("Name is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

const Signup = () => {
  const { setToken } = useContext(MainContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleRequestOtp = async (values) => {
    setLoading(true)
    try {
      const res = await requestOtp(values.email);
      if (res.data.success) {
        setFormData(values);
        setIsOtpSent(true);
        alert("OTP sent to your email!");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false); // hide loader
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true)
    try {
      const res = await verifyOtp({ ...formData, otp });
      if (res.status === 201) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false); // hide loader
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Create an Account 🚀</h2>
        <p className="text-center text-gray-500 mb-6">Start your journey with us</p>

        <Formik
          initialValues={{ email: "", name: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={handleRequestOtp}
        >
          {() => (
            <Form className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2D3092]"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2D3092]"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Password */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="mt-1 w-full px-4 py-2 border rounded-lg pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2D3092]"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>

                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* OTP */}
              {isOtpSent && (
                <>
                  <div>
                    <label htmlFor="otp" className="block text-sm font-semibold text-gray-700">Enter OTP</label>
                    <input
                      type="text"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200"
                  >
                    Verify & Sign Up
                  </button>
                </>
              )}

              {/* Send OTP */}
              {loading && (
                <>
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Please wait...
                </>
                )}
              {(!loading && !isOtpSent) && (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 bg-[#2D3092] hover:bg-opacity-80 text-white font-semibold rounded-lg transition duration-200"
                >
                  Send OTP
                </button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
