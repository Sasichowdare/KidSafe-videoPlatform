// Register.jsx

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Login.module.css"; // reuse Login styles here

export const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`http://localhost:5000/auth/register`, formData);
            navigate("/login");
        } catch (error) {
            setError("Error creating user");
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.title}>Create Account</h2>
                    {error && <div className={styles.error}>{error}</div>}
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.group}>
                            <input
                                className={styles.input}
                                type="text"
                                name="name"
                                placeholder="Username"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.group}>
                            <input
                                className={styles.input}
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.group}>
                            <input
                                className={styles.input}
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.buttons}>
                            <button
                                className={`${styles.button} ${styles.login}`}
                                type="submit"
                            >
                                Register
                            </button>
                            <button
                                className={`${styles.button} ${styles.register}`}
                                type="button"
                                onClick={() => navigate("/login")}
                            >
                                Already have an account? Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
