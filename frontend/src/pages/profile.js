// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../css/Profile.module.css";

const Profile = () => {
  const [updatedData, setUpdatedData] = useState({
    username: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        console.log("📥 Fetching user profile");
        const { data } = await axios.get(
          "http://localhost:5000/user/details",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("📥 Profile data:", data);
        setUpdatedData({ username: data.username, email: data.email });
      } catch (err) {
        console.error("✖️ fetchUser error:", err.response || err);
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      console.log("📤 Updating profile with:", updatedData);
      const { data } = await axios.put(
        "http://localhost:5000/user/update-user",
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("📥 update response:", data);
      setMessage(data.message);
    } catch (err) {
      console.error("✖️ handleProfileUpdate error:", err.response || err);
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      console.log("🔑 Updating password with:", passwordData);
      const { data } = await axios.put(
        "http://localhost:5000/user/update-password",
        passwordData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("📥 password update response:", data);
      setMessage(data.message);
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (err) {
      console.error("✖️ handlePasswordUpdate error:", err.response || err);
      setError(err.response?.data?.message || "Failed to update password");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={styles.profileContainer}>
      <h2>Profile</h2>
      {message && <p className={styles.successMessage}>{message}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}

      <form onSubmit={handleProfileUpdate}>
        <label>Username:</label>
        <input
          type="text"
          value={updatedData.username}
          onChange={(e) =>
            setUpdatedData({ ...updatedData, username: e.target.value })
          }
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={updatedData.email}
          onChange={(e) =>
            setUpdatedData({ ...updatedData, email: e.target.value })
          }
          required
        />
        <button type="submit">Update Profile</button>
      </form>

      <h3>Change Password</h3>
      <form onSubmit={handlePasswordUpdate}>
        <label>Current Password:</label>
        <input
          type="password"
          value={passwordData.currentPassword}
          onChange={(e) =>
            setPasswordData({
              ...passwordData,
              currentPassword: e.target.value,
            })
          }
          required
        />
        <label>New Password:</label>
        <input
          type="password"
          value={passwordData.newPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, newPassword: e.target.value })
          }
          required
        />
        <button type="submit">Update Password</button>
      </form>

      <div className={styles.actions}>
        <button
          onClick={() => navigate(-1)}
          className={styles.backButton}
        >
          ← Back
        </button>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
