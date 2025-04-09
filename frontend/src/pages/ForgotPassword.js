import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { requestOtp, verifyResetOtp, resetPassword } from "../apis"; 
import { Eye, EyeOff } from "lucide-react";


const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const otpSchema = Yup.object().shape({
    otp: Yup.string().length(6, "OTP must be 6 digits").required("OTP is required"),
  });

  const passwordSchema = Yup.object().shape({
    newPassword: Yup.string().min(6, "Minimum 6 characters").required("New password is required"),
  });

  const handleSendOtp = async (values) => {
    setLoading(true); // show loader
    try {
      const res = await requestOtp(values.email);
      if (res.data.success) {
        setEmail(values.email);
        setStep(2);
        alert("OTP sent to your email");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error("Failed to send OTP:", err);
      alert("Something went wrong.");
    } finally {
        setLoading(false); // hide loader
      }
  };

  const handleVerifyOtp = async (values) => {
    setLoading(true);
    try {
      const res = await verifyResetOtp({ ...values, email });
      if (res.data.success) {
        setStep(3);
        alert("OTP verified");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error("Failed to verify OTP:", err);
      alert("Something went wrong.");
    } finally {
        setLoading(false); // hide loader
      }
  };

  const handleNewPasswordSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await resetPassword({ ...values, email });
      if (res.data.success) {
        alert("Password reset successful!");
        window.location.href = "/login";
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error("Failed to reset password:", err);
      alert("Something went wrong.");
    } finally {
        setLoading(false); // hide loader
      }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-blue-100 flex items-center justify-center px-4 relative">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Forgot Password 🔐
        </h2>

        <p className="text-center text-gray-500 mb-6">
          {step === 1 && "Enter your registered email to receive an OTP"}
          {step === 2 && "Enter the OTP sent to your email"}
          {step === 3 && "Set a new password"}
        </p>

        {step === 1 && (
          <Formik initialValues={{ email: "" }} validationSchema={emailSchema} onSubmit={handleSendOtp}>
            {() => (
              <Form className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="email" component="div" className="text-sm text-red-500 mt-1" />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-[#2D3092] text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center"
                    disabled={loading}
                    >
                    {loading ? (
                        <>
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Please wait...
                        </>
                    ) : (
                        "Send OTP"
                    )}
                </button>
              </Form>
            )}
          </Formik>
        )}

        {step === 2 && (
          <Formik initialValues={{ otp: "" }} validationSchema={otpSchema} onSubmit={handleVerifyOtp}>
            {() => (
              <Form className="space-y-5">
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
                  <Field
                    name="otp"
                    type="text"
                    className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="otp" component="div" className="text-sm text-red-500 mt-1" />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-[#2D3092] text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center"
                    disabled={loading}
                    >
                    {loading ? (
                        <>
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Please wait...
                        </>
                    ) : (
                        "Verify OTP"
                    )}
                </button>
              </Form>
            )}
          </Formik>
        )}

        {step === 3 && (
          <Formik initialValues={{ newPassword: "" }} validationSchema={passwordSchema} onSubmit={handleNewPasswordSubmit}>
            {() => (
              <Form className="space-y-5">
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                 <div className="relative">
                    <Field
                        name="newPassword"
                        type={showPassword ? "text" : "password"}
                        className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 bottom-2.5 text-gray-500 hover:text-gray-700"
                        >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                 </div>
                  <ErrorMessage name="newPassword" component="div" className="text-sm text-red-500 mt-1" />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-[#2D3092] text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center"
                    disabled={loading}
                    >
                    {loading ? (
                        <>
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Please wait...
                        </>
                    ) : (
                        "Reset Password"
                    )}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
