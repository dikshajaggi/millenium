// SignupForm.js
import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});


const Signup = ({ onSubmit }) => {
    const navigate = useNavigate()

    const handleSignup = async (values) => {
        try {
            const response = await fetch("http://localhost:8000/api/user/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            if (response.ok) navigate("/login")
        } catch (error) {
            // Handle signup error
            console.error('Signup failed:', error);
        }
    };
    return (
        <Formik
            initialValues={{ email: '', username: '', password: '' }}
            validationSchema={SignupSchema}
            onSubmit={handleSignup}
        >
            <Form>
                <div>
                    <label htmlFor="email">Email:</label>
                    <Field type="email" id="email" name="email" />
                    <ErrorMessage name="email" component="div" />
                </div>

                <div>
                    <label htmlFor="username">Username:</label>
                    <Field type="text" id="username" name="username" />
                    <ErrorMessage name="username" component="div" />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <Field type="password" id="password" name="password" />
                    <ErrorMessage name="password" component="div" />
                </div>

                <div>
                    <button type="submit">Signup</button>
                </div>
            </Form>
        </Formik>
    );
};

export default Signup;

