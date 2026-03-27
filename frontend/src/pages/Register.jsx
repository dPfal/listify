import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import logo from "../assets/listify-logo.png";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { id, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));

    setErrors(prev => ({
      ...prev,
      [id]: "",
      server: "",
    }));
  };

  const handleRegister = async e => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setErrors({});

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({
          server: data.message || "Registration failed",
        });
        return;
      }

      navigate("/login");
    } catch (error) {
      setErrors({
        server: "Server error. Please try again.",
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-phone-frame">
        <div className="login-content">
          <div className="brand-wrap">
            <img src={logo} alt="Listify logo" className="brand-logo" />
          </div>

          <form className="login-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? "input-error" : ""}
              />
              {errors.username && (
                <p className="error-label">{errors.username}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && (
                <p className="error-label">{errors.password}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "input-error" : ""}
              />
              {errors.confirmPassword && (
                <p className="error-label">{errors.confirmPassword}</p>
              )}
            </div>

            {errors.server && (
              <p className="error-label server-error">{errors.server}</p>
            )}

            <button type="submit" className="login-button">
              Sign Up
            </button>
          </form>

          <p className="signup-text">
            Already have an account?{" "}
            <Link to="/login" className="signup-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
