import React from 'react'

const PlaceOrderForm = ({ data, setData }) => {
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    return (
        <>
            <div className="delivery-info">
                <h2>Delivery Information</h2>
                <form>
                    <div className="form-row">
                        <input required name="firstName" value={data.firstName} onChange={onChangeHandler} type="text" placeholder="First name" />
                        <input required name="lastName" value={data.lastName} onChange={onChangeHandler} type="text" placeholder="Last name" />
                    </div>
                    <div className="form-row">
                        <input required name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder="Email address" />
                    </div>
                    <div className="form-row">
                        <input required name="street" value={data.street} onChange={onChangeHandler} type="text" placeholder="Street" />
                    </div>
                    <div className="form-row">
                        <input required name="city" value={data.city} onChange={onChangeHandler} type="text" placeholder="City" />
                        <input required name="state" value={data.state} onChange={onChangeHandler} type="text" placeholder="State" />
                    </div>
                    <div className="form-row">
                        <input required name="pincode" value={data.pincode} onChange={onChangeHandler} type="text" placeholder="Pin code" />
                    </div>
                    <div className="form-row">
                        <input required name="phone" value={data.phone} onChange={onChangeHandler} type="text" placeholder="Phone" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default PlaceOrderForm
