import { useState, useEffect } from "react";
import { login, signup, getCurrentUser } from "../../utils/auth";
import { alertWithAsyncActionToast } from "../../utils/alerts";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./login.module.css";
import Logo from "../../components/Logo";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (getCurrentUser()) {
      navigate("/");
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin) {
      if (!formData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!formData.lastName.trim())
        newErrors.lastName = "Last name is required";
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
    }

    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!isLogin && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await signup(formData);
      setIsLogin(true);
      setFormData({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
      });
      setErrors({});
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      await alertWithAsyncActionToast(() => login(formData));
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isLogin ? handleLogin() : handleSignup();
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
    });
    setErrors({});
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundOverlay}></div>

      <div className={styles.authCard}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Logo clickable={false} />
          </div>
          <h2 className={styles.title}>
            {isLogin ? "Welcome Back" : "Join Us"}
          </h2>
          <p className={styles.subtitle}>
            {isLogin
              ? "Sign in to continue to your entertainment hub"
              : "Create your account to explore movies and shows"}
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.nameRow}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className={`${styles.input} ${
                    errors.firstName ? styles.errorBorder : ""
                  }`}
                  required
                />
                <span className={styles.required}>*</span>
                {errors.firstName && (
                  <span className={styles.errorText}>{errors.firstName}</span>
                )}
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className={`${styles.input} ${
                    errors.lastName ? styles.errorBorder : ""
                  }`}
                  required
                />
                <span className={styles.required}>*</span>
                {errors.lastName && (
                  <span className={styles.errorText}>{errors.lastName}</span>
                )}
              </div>
            </div>
          )}

          <div className={styles.inputGroup}>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
              className={`${styles.input} ${
                errors.username ? styles.errorBorder : ""
              }`}
              required
            />
            <span className={styles.required}>*</span>
            {errors.username && (
              <span className={styles.errorText}>{errors.username}</span>
            )}
          </div>

          {!isLogin && (
            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email (optional)"
                className={`${styles.input} ${
                  errors.email ? styles.errorBorder : ""
                }`}
              />
              {errors.email && (
                <span className={styles.errorText}>{errors.email}</span>
              )}
            </div>
          )}

          <div className={styles.inputGroup}>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className={`${styles.input} ${
                errors.password ? styles.errorBorder : ""
              }`}
              required
            />
            <span className={styles.required}>*</span>
            {errors.password && (
              <span className={styles.errorText}>{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={styles.primaryButton}
          >
            {isLoading
              ? "Processing..."
              : isLogin
              ? "Sign In"
              : "Create Account"}
          </button>

          <div className={styles.divider}>
            <span className={styles.dividerText}>or</span>
          </div>

          <button
            type="button"
            onClick={toggleForm}
            className={styles.secondaryButton}
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
