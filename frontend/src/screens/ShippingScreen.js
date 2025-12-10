import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveShipping } from "../actions/CartAction";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen(props) {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({ address, city, postalCode, country }));
        props.history.push("payment");
    };

    return (
        <div className="checkout-wrapper">
            <CheckoutSteps step1 step2 />

            <div className="checkout-card">
                <h2 className="checkout-title">Shipping Information</h2>

                <form onSubmit={submitHandler} className="checkout-form">

                    <label>Address</label>
                    <input
                        type="text"
                        placeholder="Enter your address"
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <label>City</label>
                    <input
                        type="text"
                        placeholder="Enter your city"
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <label>Postal Code</label>
                    <input
                        type="text"
                        placeholder="Enter your postal code"
                        onChange={(e) => setPostalCode(e.target.value)}
                    />

                    <label>Country</label>
                    <input
                        type="text"
                        placeholder="Enter your country"
                        onChange={(e) => setCountry(e.target.value)}
                    />

                    <button type="submit" className="checkout-btn">
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ShippingScreen;
