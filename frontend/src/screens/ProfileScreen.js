import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userAction";

function ProfileScreen() {
    const dispatch = useDispatch();

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    return (
        <div className="profile-wrapper">
            <div className="profile-card">
                <div className="profile-header">
                    <h2>User Profile</h2>
                    <p className="sub-title">Welcome back, {userInfo?.name}</p>
                </div>

                <div className="profile-details">
                    <div className="detail-row">
                        <span className="label">Name:</span>
                        <span className="value">{userInfo?.name}</span>
                    </div>

                    <div className="detail-row">
                        <span className="label">Email:</span>
                        <span className="value">{userInfo?.email}</span>
                    </div>

                    <div className="detail-row">
                        <span className="label">User ID:</span>
                        <span className="value">{userInfo?._id}</span>
                    </div>
                </div>

                <button
                    className="logout-btn-profile"
                    onClick={() => dispatch(logout())}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default ProfileScreen;
