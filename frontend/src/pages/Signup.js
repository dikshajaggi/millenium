// SignupForm.js
import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../context/MainContext';
import "./styles.scss"


const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});


const Signup = ({ onSubmit }) => {
    const navigate = useNavigate()
    const context = useContext(MainContext)

    const handleSignup = async (values) => {
        try {
            const response = await fetch("https://millenium-orthodontics.onrender.com/api/user/register", {
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
        <>
            {context.userLoginToken ? <div>already logged in</div> : <Formik
                initialValues={{ email: '', username: '', password: '' }}
                validationSchema={SignupSchema}
                onSubmit={handleSignup}
            >
                <div className='d-flex justify-content-center align-items-center minheight'>
                    <Form className='d-flex flex-column justify-content-evenly align-items-center border formheight'>
                        <div>
                            <div className='d-flex justify-content-between align-items-center divWidth'>
                                <label htmlFor="email">Email:</label>
                                <Field type="email" id="email" name="email" />
                            </div>
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>

                        <div>
                            <div className='d-flex justify-content-between align-items-center divWidth'>
                                <label htmlFor="username">Username:</label>
                                <Field type="text" id="username" name="username" />
                            </div>
                            <ErrorMessage name="username" component="div" className="text-danger" />
                        </div>

                        <div>
                            <div className='d-flex justify-content-between align-items-center divWidth'>
                                <label htmlFor="password">Password:</label>
                                <Field type="password" id="password" name="password" />
                            </div>
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>

                        <div>
                            <button type="submit" className="btn buttons btn-sm">Signup</button>
                        </div>
                    </Form>
                </div>
            </Formik>}
        </>
    );
};

export default Signup;

