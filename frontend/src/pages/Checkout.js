import React, { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./styles.scss"
import { MainContext } from '../context/MainContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckoutSchema = Yup.object().shape({
    userName: Yup.string().required('Required'),
    phoneNumber: Yup.string()
        .required('Required')
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits and contain only numeric values'),
    address: Yup.string().required('Required'),
    street: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    country: Yup.string().oneOf(['India'], 'Invalid country').required('Required'),
    paymentMethod: Yup.string().required('Required'),
});

const Checkout = () => {
    const context = useContext(MainContext)
    const initialValues = {
        userName: '',
        phoneNumber: '',
        address: '',
        street: '',
        city: '',
        state: '',
        country: 'India',
        paymentMethod: '',
    };

    const sendOrder = async (phoneNumber) => {
        const info = await fetch('http://localhost:8000/api/order/send-order-details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': context.userLoginToken,
            },
            body: JSON.stringify({ phoneNumber }),
        });
    }
    const handleSubmit = async (values, { resetForm }) => {
        console.log(context.userLoginToken, 'Checkout successful:')
        try {
            const response = await fetch('http://localhost:8000/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': context.userLoginToken,
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Checkout successful:', data, values.phoneNumber, context.userLoginToken,);
                toast.success('Order placed successfully');

                await sendOrder(values.phoneNumber)
                // Reset form fields
                // resetForm({ values: initialValues });
            } else {
                console.error('Checkout failed:', data.message);
                toast.error('Failed to place order');
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            toast.error('An error occurred');
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <h2>Checkout</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={CheckoutSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="userName" className="form-label">User Name</label>
                                <Field type="text" name="userName" className="form-control" />
                                <ErrorMessage name="userName" component="div" className="text-danger" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                <Field type="text" name="phoneNumber" className="form-control" />
                                <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <Field type="text" name="address" className="form-control" />
                        <ErrorMessage name="address" component="div" className="text-danger" />
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="street" className="form-label">Street</label>
                                <Field type="text" name="street" className="form-control" />
                                <ErrorMessage name="street" component="div" className="text-danger" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">City</label>
                                <Field type="text" name="city" className="form-control" />
                                <ErrorMessage name="city" component="div" className="text-danger" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="state" className="form-label">State</label>
                                <Field type="text" name="state" className="form-control" />
                                <ErrorMessage name="state" component="div" className="text-danger" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="country" className="form-label">Country</label>
                                <Field as="select" name="country" className="form-control">
                                    <option value="India">India</option>
                                </Field>
                                <ErrorMessage name="country" component="div" className="text-danger" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Payment Method</label>
                        <div className="form-check">
                            <Field type="radio" name="paymentMethod" value="COD" className="form-check-input" />
                            <label className="form-check-label">Cash on Delivery (COD)</label>
                        </div>
                        <div className="form-check">
                            <Field type="radio" name="paymentMethod" value="Paytm" className="form-check-input" />
                            <label className="form-check-label">Paytm</label>
                        </div>
                        <div className="form-check">
                            <Field type="radio" name="paymentMethod" value="GooglePay" className="form-check-input" />
                            <label className="form-check-label">Google Pay</label>
                        </div>
                        <ErrorMessage name="paymentMethod" component="div" className="text-danger" />
                    </div>
                    <button className="btn buttons">Place Order</button>
                </Form>
            </Formik>
            <ToastContainer />
        </div>
    );
};

export default Checkout;
