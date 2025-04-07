import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import hide from "../assests/images/hide.png";
import show from "../assests/images/visible.png";
import { requestOtp, verifyOtp } from "../apis"; // New API functions
import { MainContext } from "../context/MainContext";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  name: Yup.string().required("Name is required"),
  password: Yup.string().min(8, "Password must be 8+ characters").required("Password is required"),
});

const Signup = () => {
  const { setToken } = useContext(MainContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleRequestOtp = async (values) => {
    try {
      const res = await requestOtp(values.email);
      if (res.data.success) {
        setFormData(values);
        setIsOtpSent(true);
        alert("OTP sent to your email!");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtp({ ...formData, otp });
      if (res.status === 201) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <Formik
      initialValues={{ email: "", name: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={handleRequestOtp}
    >
      <div className="d-flex justify-content-center align-items-center minheight">
        <Form className="d-flex flex-column justify-content-evenly align-items-center border formheight">
          <div className="divWidth">
            <label htmlFor="email">Email:</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>

          <div className="divWidth">
            <label htmlFor="name">Name:</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>

          <div className="divWidth">
            <label htmlFor="password">Password:</label>
            <Field type={showPassword ? "text" : "password"} id="password" name="password" />
            <button type="button" onClick={togglePasswordVisibility} className="pass-visibility">
              <img src={showPassword ? hide : show} alt="show/hide pass" className="pass-visibility-img" />
            </button>
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div>

          {!isOtpSent && (
            <button type="submit" className="btn buttons btn-sm">Send OTP</button>
          )}

          {isOtpSent && (
            <>
              <div className="divWidth">
                <label>Enter OTP:</label>
                <input value={otp} onChange={(e) => setOtp(e.target.value)} />
              </div>
              <button type="button" className="btn buttons btn-sm" onClick={handleVerifyOtp}>
                Verify & Signup
              </button>
            </>
          )}
        </Form>
      </div>
    </Formik>
  );
};

export default Signup;
