// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { savePayment } from "../actions/CartAction";
// import CheckoutSteps from "../components/CheckoutSteps";

// function PaymentScreen(props) {
//     const [paymentMethod, setPaymentMethod] = useState("");

//     const dispatch = useDispatch();

//     const submitHandler = e => {
//         e.preventDefault();
//         dispatch(savePayment(paymentMethod));
//         props.history.push("placeorder");
//     };
//     return (
//         <div>
//             <CheckoutSteps step1 step2 step3></CheckoutSteps>
//             <div className="form">
//                 <form onSubmit={submitHandler}>
//                     <ul className="form-container">
//                         <li>
//                             <h2>Payment</h2>
//                         </li>
//                         <li>
//                             <input
//                                 type="radio"
//                                 name="paymentMethod"
//                                 id="paymentMethod"
//                                 onChange={e => setPaymentMethod(e.target.value)}
//                                 value="paypal"
//                             ></input>
//                             <label htmlFor="paymentMethod">Paypal</label>
//                         </li>
//                         <li>
//                             <button type="submit" className="button primary">
//                                 Continue
//                             </button>
//                         </li>
//                     </ul>
//                 </form>
//             </div>
//         </div>
//     );
// }
// export default PaymentScreen;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { savePayment } from "../actions/CartAction";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen(props) {
    const [paymentMethod, setPaymentMethod] = useState("");

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayment(paymentMethod));
        props.history.push("placeorder");
    };

    return (
        <div className="checkout-wrapper">
            <CheckoutSteps step1 step2 step3 />

            <div className="checkout-card">
                <h2 className="checkout-title">Select Payment Method</h2>

                <form onSubmit={submitHandler} className="checkout-form">

                    <label className="radio-option">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span>Paypal</span>
                    </label>

                    <label className="radio-option">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="stripe"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span>Stripe</span>
                    </label>

                    <button type="submit" className="checkout-btn">
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PaymentScreen;
