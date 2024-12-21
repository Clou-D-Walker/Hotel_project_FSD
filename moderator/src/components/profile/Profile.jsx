import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./Profile.scss";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchUser = async () => {
        try {
            const storedData = localStorage.getItem("localhost:3002");
            if (!storedData) {
                throw new Error("No data found in localStorage for 'localhost:3002'");
            }

            const parsedData = JSON.parse(storedData);
            const id = parsedData?._id || "674df9f06b8e4b315e358e58";

            const res = await axios.get(`http://localhost:8800/api/users/${id}`);
            setUser(res.data);
        } catch (err) {
            console.error("Error fetching user:", err.response || err.message);
            setError(err.response?.status === 404
                ? "User not found."
                : "Failed to fetch user data."
            );
        } finally {
            setLoading(false);
        }
    };


    if (loading) return <div className="profile-loading">Loading...</div>;
    if (error) return <div className="profile-error">{error}</div>;

    return (
        <div className="profile-page">
            <Sidebar />
            <div className="profile-main">
                <Navbar />
                <div className="profile-container">
                    <div className="profile-card">
                        <div className="profile-img">
                            <img
                                src={user.img || "https://via.placeholder.com/150"}
                                alt={user.username}
                            />
                        </div>
                        <div className="profile-info">
                            <h2>{user.username}</h2>
                            <p>Email: {user.email}</p>
                            <p>Country: {user.country}</p>
                            <p>City: {user.city}</p>
                            <p>Phone: {user.phone || "Not provided"}</p>
                            <p>
                                Role:{" "}
                                {user.isAdmin
                                    ? "Admin"
                                    : user.isModerator
                                        ? "Moderator"
                                        : "User"}
                            </p>
                            <small>Joined: {new Date(user.createdAt).toDateString()}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
