import React from "react";
import "./App.css";

import { BrowserRouter, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "./actions/userAction";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShipppingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import logo from "./Images/logo.png";
import { useLocation } from "react-router-dom";

function App() {
    const location = useLocation();
    const hideHeaderRoutes = ["/signin", "/register"];
    const hideHeader = hideHeaderRoutes.includes(location.pathname);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const openmenu = () => {
        document.querySelector(".sidebar").classList.add("open");
    };
    const closemenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
    };
    return (
        <div className="grid-container">
            {/* <header className="header">
                    <div className="brand">
                        <button onClick={openmenu}>&#9776;</button>
                        <Link to="/">
                            Origami
                            <img src={logo} className="logo" />
                        </Link>
                    </div>
                    <div className="header-links">
                        <span>
                            <Link to="/cart">
                                <span className="material-icons">
                                    shopping_cart
                                </span>
                            </Link>
                        </span>
                        <span>
                            {userInfo ? (
                                <>
                                    <Link to="/profile">{userInfo.name}</Link>

                                    <button
                                        onClick={() => {
                                            dispatch(logout());
                                        }}
                                        className="logout-btn"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link to="/signin">
                                    <span className="material-icons">login</span>
                                </Link>
                            )}
                        </span>

                    </div>
                </header> */}
            {!hideHeader && (
                <header className="header">
                    <div className="brand">
                        <button onClick={openmenu}>&#9776;</button>
                        <Link to="/">
                            <img src="https://rbuchd.in/navbar/RBU_logo.svg" className="logo" />
                        </Link>
                    </div>
                    <div className="header-links">
                        <span>
                            <Link to="/cart" className="cart-wrapper-final">
    <span className="material-icons cart-icon-final">shopping_cart</span>

    {cartItems.length > 0 && (
        <span className="cart-badge-final">{cartItems.length}</span>
    )}
</Link>



                        </span>

                        <span>
                            {userInfo ? (
                                <>
                                    <Link to="/profile">{userInfo.name}</Link>
                                </>
                            ) : (
                                <Link to="/signin">
                                    <span className="material-icons">login</span>
                                </Link>
                            )}
                        </span>
                    </div>
                </header>
            )}
            {!hideHeader && (
                <aside className="sidebar">
                    <h3>Categories</h3>
                    <button
                        className="sidebar-close-button"
                        onClick={closemenu}
                    >
                        <span className="material-icons">arrow_back_ios</span>
                    </button>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>

                        {userInfo && userInfo.isAdmin && (
                            <li>
                                <Link to="/products">Products</Link>
                            </li>
                        )}
                        <li>
                            <Link to="/cart">Cart</Link>
                        </li>
                        {!userInfo && (
                            <>
                                <li>
                                    <Link to="/signin">Sign In</Link>
                                </li>
                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>

                </aside>
            )}
            <main className="main">
                <div className="content">
                    <Route path="/profile" component={ProfileScreen} />
                    <Route path="/products" component={ProductsScreen} />
                    <Route path="/shipping" component={ShipppingScreen} />
                    <Route path="/payment" component={PaymentScreen} />
                    <Route
                        path="/placeorder"
                        component={PlaceOrderScreen}
                    />
                    <Route path="/signin" component={SigninScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/product/:id" component={ProductScreen} />
                    <Route path="/" exact={true} component={HomeScreen} />
                    <Route path="/cart/:id?" component={CartScreen} />
                </div>
            </main>
            <footer className="footer">All right reserved</footer>
        </div>
    );
}

export default App;
