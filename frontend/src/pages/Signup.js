// SignupForm.js
import React, {useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import hide from "../assests/images/hide.png";
import show from "../assests/images/visible.png";
import { signup } from "../apis";
import { MainContext } from "../context/MainContext";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  name: Yup.string().required("name is required"),
  password: Yup.string().required("Password is required"),
});

const Signup = ({ onSubmit }) => {
  const {setToken} = useContext(MainContext)
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (values) => {
    try {
      const response = await signup(values)
      console.log(response, "response")
      if(response.status === 201){
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)
        navigate("/")
      }
    } catch (error) {
      alert(error.response.data.message);
      // Handle signup error
      console.error("Signup failed:", error);
    }
  };
  return (
    <>
        <Formik
          initialValues={{ email: "", name: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={handleSignup}
        >
          <div className="d-flex justify-content-center align-items-center minheight">
            <Form className="d-flex flex-column justify-content-evenly align-items-center border formheight">
              <div>
                <div className="d-flex justify-content-between align-items-center divWidth">
                  <label htmlFor="email">Email:</label>
                  <Field type="email" id="email" name="email" />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div>
                <div className="d-flex justify-content-between align-items-center divWidth">
                  <label htmlFor="name">Name:</label>
                  <Field type="text" id="name" name="name" />
                </div>
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div>
                <div className="d-flex justify-content-between align-items-center divWidth">
                  <label htmlFor="password">Password:</label>
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                  />
                </div>
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="pass-visibility"
                >
                  <img
                    src={showPassword ? hide : show}
                    className="pass-visibility-img"
                    alt="show/hide pass"
                  />
                </button>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div>
                <button type="submit" className="btn buttons btn-sm">
                  Signup
                </button>
              </div>
            </Form>
          </div>
        </Formik>
    </>
  );
};

export default Signup;
