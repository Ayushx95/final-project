// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, removeFromCart } from "../actions/CartAction";
// import { Link } from "react-router-dom";

// function CartScreen(props) {
//     const cart = useSelector(state => state.cart);
//     const { cartItems } = cart;
//     const productId = props.match.params.id;
//     const qty = props.location.search
//         ? Number(props.location.search.split("=")[1])
//         : 1;
//     const dispatch = useDispatch();
//     const removeFromCartHandler = productId => {
//         dispatch(removeFromCart(productId));
//     };
//     useEffect(() => {
//         window.scrollTo(0, 0);
//         if (productId) {
//             dispatch(addToCart(productId, qty));
//         }
//     }, []);
//     const checkoutHandler = () => {
//         props.history.push("/signin?redirect=shipping");
//     };

//     return (
//         <div className="cart">
//             <div className="cart-list">
//                 <ul className="cart-list-container">
//                     <li>
//                         <h1>Your Cart</h1>
//                         <div>Price</div>
//                     </li>
//                     {cartItems.length === 0 ? (
//                         <div>
//                             <h1>Cart is Empty.</h1>
//                         </div>
//                     ) : (
//                         cartItems.map(item => (
//                             <li>
//                                 <div className="cart-image">
//                                     <img src={item.image} alt="product" />
//                                 </div>
//                                 <div className="cart-name">
//                                     <div>
//                                         <Link to={"/product/" + item.product}>
//                                             {item.name}
//                                         </Link>
//                                     </div>
//                                     <div>
//                                         Quantity :
//                                         <select
//                                             value={item.qty}
//                                             onChange={e =>
//                                                 dispatch(
//                                                     addToCart(
//                                                         item.product,
//                                                         e.target.value
//                                                     )
//                                                 )
//                                             }
//                                         >
//                                             <option value="1">1</option>
//                                             <option value="2">2</option>
//                                             <option value="3">3</option>
//                                         </select>
//                                         <button
//                                             type="button"
//                                             onClick={() =>
//                                                 removeFromCartHandler(
//                                                     item.product
//                                                 )
//                                             }
//                                             className="cart-button"
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <div className="cart-price">${item.price}</div>
//                             </li>
//                         ))
//                     )}
//                 </ul>
//             </div>
//             <div className="cart-action">
//                 <h3>
//                     Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
//                     : ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
//                 </h3>
//                 <button
//                     className="button primary full-width"
//                     disabled={cartItems.length === 0}
//                     onClick={checkoutHandler}
//                 >
//                     Proceed to Checkout
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default CartScreen;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/CartAction";
import { Link } from "react-router-dom";

function CartScreen(props) {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const productId = props.match.params.id;

    const qty = props.location.search
        ? Number(props.location.search.split("=")[1])
        : 1;

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping");
    };

    return (
        <div className="cart-page">
            <div className="cart-container">

                {/* LEFT SIDE - CART ITEMS */}
                <div className="cart-items">
                    <h2 className="cart-title">Your Shopping Cart</h2>

                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <h3>Your cart is empty.</h3>
                            <Link to="/" className="back-home-btn">
                                Go Back to Shop
                            </Link>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div className="cart-item-card" key={item.product}>

                                <img src={item.image} alt={item.name} />

                                <div className="cart-item-info">
                                    <Link
                                        to={`/product/${item.product}`}
                                        className="product-name"
                                    >
                                        {item.name}
                                    </Link>

                                    <div className="cart-controls">
                                        <select
                                            value={item.qty}
                                            onChange={(e) =>
                                                dispatch(
                                                    addToCart(
                                                        item.product,
                                                        Number(e.target.value)
                                                    )
                                                )
                                            }
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                removeFromCartHandler(item.product)
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                <div className="item-price">${item.price}</div>
                            </div>
                        ))
                    )}
                </div>

                {/* RIGHT SIDE - SUMMARY BOX */}
                <div className="cart-summary">
                    <h3>Order Summary</h3>
                    <p>
                        Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
                    </p>

                    <h2 className="total-price">
                        ${cartItems
                            .reduce((a, c) => a + c.price * c.qty, 0)
                            .toFixed(2)}
                    </h2>

                    <button
                        className="checkout-btn"
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartScreen;

