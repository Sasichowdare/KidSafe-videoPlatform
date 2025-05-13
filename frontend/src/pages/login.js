import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/Login.module.css'; // Import the CSS module

export const Login = () => {
  const [formData, setFormData] = useState({ emailORName: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/auth/login`, formData);
      console.log(response); // Debug the response to see if the token is returned
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/feed');
      } else {
        setError('Failed to get token');
      }
    } catch (error) {
      console.error(error);
      setError('Invalid credentials');
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Welcome to Scoll</h2>
          {error && <p className={styles.error}>{error}</p>}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.group}>
              <input
                className={styles.input}
                type="text"
                name="emailORName"
                placeholder="Email or Username"
                value={formData.emailORName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.group} style={{ position: 'relative' }}>
              <input
                className={styles.input}
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className={styles.toggle}
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide Password' : 'Show Password'}
              >
                {showPassword ? '👁️' : '🫣'}
              </span>
            </div>
            <div className={styles.buttons}>
              <button className={`${styles.button} ${styles.login}`} type="submit">
                Sign In
              </button>
              <button
                className={`${styles.button} ${styles.register}`}
                type="button"
                onClick={() => navigate('/register')}
              >
                Create New Account
              </button>

              <button
                type="button"
                className={`${styles.button} ${styles.forgotPassword}`}
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
