import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/CartAction";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { CART_EMPTY } from "../constants/cartConstants";
import * as Cookie from "js-cookie";

function PlaceOrderScreen(props) {
    const [showModal, setShowModal] = useState(false);
    const cart = useSelector(state => state.cart);
    const { cartItems, shipping, payment } = cart;
    if (!shipping.address) {
        props.history.push("/shipping");
    } else if (!payment) {
        props.history.push("/payment");
    }
    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const placeOrderHandler = () => {

        setShowModal(true);
    };

    return (
        <div className="checkout-wrapper">
            <CheckoutSteps step1 step2 step3 step4 />

            <div className="placeorder-container">
                <div className="placeorder-left">

                    {/* SHIPPING */}
                    <div className="info-card">
                        <h3>Shipping</h3>
                        <p>
                            {cart.shipping.address}, {cart.shipping.city},{" "}
                            {cart.shipping.postalCode}, {cart.shipping.country}
                        </p>
                    </div>

                    {/* PAYMENT */}
                    <div className="info-card">
                        <h3>Payment</h3>
                        <p>Payment Method: {cart.payment.paymentMethod}</p>
                    </div>

                    {/* CART ITEMS */}
                    <div className="info-card">
                        <h3>Shopping Cart</h3>

                        {cartItems.length === 0 ? (
                            <p>Cart is Empty.</p>
                        ) : (
                            cartItems.map((item) => (
                                <div className="cart-row" key={item.product}>
                                    <img src={item.image} alt={item.name} />

                                    <div className="cart-row-info">
                                        <Link
                                            to={`/product/${item.product}`}
                                            className="product-name"
                                        >
                                            {item.name}
                                        </Link>

                                        <div className="qty-text">
                                            Quantity: {item.qty}
                                        </div>
                                    </div>

                                    <div className="price-text">${item.price}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* RIGHT SIDE – ORDER SUMMARY */}
                <div className="summary-card">
                    <button
                        className="checkout-btn full"
                        onClick={placeOrderHandler}
                    >
                        Place Order
                    </button>

                    <h3>Order Summary</h3>

                    <div className="summary-row">
                        <span>Items:</span>
                        <span>${itemsPrice.toFixed(2)}</span>
                    </div>

                    <div className="summary-row">
                        <span>Shipping:</span>
                        <span>${shippingPrice.toFixed(2)}</span>
                    </div>

                    <div className="summary-row">
                        <span>Tax:</span>
                        <span>${taxPrice.toFixed(2)}</span>
                    </div>

                    <div className="summary-row total">
                        <span>Total:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>Order Placed Successfully 🎉</h2>
                        <p>Thank you for shopping with us!</p>

                        <button
                            className="modal-btn"
                            onClick={() => {
                                dispatch({ type: CART_EMPTY });
                                localStorage.removeItem("cartItems");
                                Cookie.remove("cartItems"); 
                                props.history.push("/");
                            }}
                        >
                            OK
                        </button>

                    </div>
                </div>
            )}

        </div>
    );

}

export default PlaceOrderScreen;


