import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../actions/userAction";

function SigninScreen(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userSignin = useSelector((state) => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const dispatch = useDispatch();

    const redirect = props.location.search
        ? props.location.search.split("=")[1]
        : "/";

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
        window.scrollTo(0, 0);
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    };

    return (
        <div className="signin-wrapper">
            <div className="signin-card">
                <h2 className="signin-title">Welcome Back</h2>
                <p className="signin-subtitle">Sign in to continue shopping</p>

                {loading && <div className="loading">Loading...</div>}
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={submitHandler}>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" className="signin-btn">
                        Sign In
                    </button>

                    <p className="signup-text">New to Origami?</p>

                    <Link
                        to={
                            redirect === "/"
                                ? "register"
                                : "register?redirect=" + redirect
                        }
                        className="signup-btn"
                    >
                        Create an Account
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default SigninScreen;
