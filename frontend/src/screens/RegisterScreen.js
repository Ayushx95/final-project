import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/userAction";

function RegisterScreen(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, userInfo, error } = userRegister;

    const dispatch = useDispatch();

    const redirect = props.location.search
        ? props.location.search.split("=")[1]
        : "/";

    useEffect(() => {
        window.scrollTo(0, 0);
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== rePassword) {
            alert("Passwords do not match!");
            return;
        }

        dispatch(register(name, email, password));
    };

    return (
        <div className="signin-wrapper">
            <div className="signin-card">
                <h2 className="signin-title">Create Account</h2>
                <p className="signin-subtitle">Join Origami today</p>

                {loading && <div className="loading">Loading...</div>}
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={submitHandler}>
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        onChange={(e) => setName(e.target.value)}
                    />

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

                    <label>Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Re-enter your password"
                        onChange={(e) => setRePassword(e.target.value)}
                    />

                    <button type="submit" className="signin-btn">
                        Register
                    </button>

                    <p className="signup-text">Already have an account?</p>

                    <Link
                        to={
                            redirect === "/"
                                ? "signin"
                                : "signin?redirect=" + redirect
                        }
                        className="signup-btn"
                    >
                        Sign In
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default RegisterScreen;
