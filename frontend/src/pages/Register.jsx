import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../assets/listify-logo.png";

function Register() {
  return (
    <div className="register-page">
      <div className="register-phone-frame">
        <div className="register-content">
          <div className="brand-wrap">
            <img src={logo} alt="Listify logo" className="brand-logo" />
          </div>

          <form className="register-form">
            <div className="form-group">
              <label htmlFor="username">username</label>
              <input id="username" type="text" placeholder="username" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="••••••••" />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <button type="button" className="register-button">
              Sign Up
            </button>
          </form>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
