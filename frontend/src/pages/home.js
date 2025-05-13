import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Home.module.css"; // adjust path if needed

export const Home = () => {
  const navigate = useNavigate();

  // ✅ Scroll Lock ONLY on Home
  useEffect(() => {
    document.body.style.overflow = "hidden"; // disable scroll
    return () => {
      document.body.style.overflow = "auto"; // reset scroll on page change
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>WELCOME PAGE</h1>
      <p className={styles.description}>
        Welcome! We're excited to have you here. 😊 If you're new, come on in —
        creating an account is quick and easy, like making a cup of coffee (but
        less messy). Already part of the family? Great! Just dust off those
        trusty login credentials and hop back in — no need to sign up again.
        <br />
        <br />
        🌟 Keep your kids safe from unwanted or inappropriate content — choose
        the videos you want them to see while they enjoy their time here.
      </p>
      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={() => navigate("/login")}>
          Login
        </button>
        <button
          className={styles.button}
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};
