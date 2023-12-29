// LoginForm.js
import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { MainContext } from '../context/MainContext';
import "./styles.scss"

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

const Login = ({ onSubmit }) => {
    const context = useContext(MainContext)
    const navigate = useNavigate()

    const handleLogin = async (values) => {
        console.log(values, "login")
        try {
            const response = await fetch("http://localhost:8000/api/user/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
            const resJson = await response.json()
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify({ name: values.username, token: resJson.token }))
                context.setUser(values.username)
                navigate("/")
            }
            console.log(resJson.token, resJson)
            context.setUserLoginToken(resJson.token)

            // token needs to be in context as it will be required to add products to the cart

        } catch (error) {
            // Handle login error
            console.error('Login failed:', error);
        }
    };

    return (
        <>
            {context.userLoginToken ? <div>already logged in</div> : <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
            >
                <div className='d-flex justify-content-center align-items-center minheight'>
                    <Form className='d-flex flex-column justify-content-evenly align-items-center border formheight'>
                        <div className='text-capitalize'>
                            <div className='d-flex justify-content-between align-items-center divWidth' >
                                <label htmlFor="username" className='mr-10'>Username:</label>
                                <Field type="text" id="username" name="username" />
                            </div>
                            <ErrorMessage name="username" component="div" className="text-danger" />
                        </div>

                        <div className='text-capitalize'>
                            <div className='d-flex justify-content-between align-items-center divWidth'>
                                <label htmlFor="password">Password:</label>
                                <Field type="password" id="password" name="password" />
                            </div>
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>

                        <div className='text-capitalize'>
                            <button className="btn buttons btn-sm" type="submit">Login</button>
                        </div>
                        <div className='text-capitalize'>
                            not registred?
                            <Link to="/signup" className='linkclass'> <button className="btn buttons btn-sm" type="submit">Signup</button></Link>
                        </div>
                    </Form>
                </div>
            </Formik>}
        </>
    );
};

export default Login;

