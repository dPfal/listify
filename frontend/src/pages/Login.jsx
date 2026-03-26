import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../assets/listify-logo.png";

function Login() {
  return (
    <div className="login-page">
      <div className="login-phone-frame">
        <div className="login-content">
          <div className="brand-wrap">
            <img src={logo} alt="Listify logo" className="brand-logo" />
          </div>

          <form className="login-form">
            <div className="form-group">
              <label htmlFor="username" class="">
                username
              </label>
              <input id="username" type="text" placeholder="username" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="••••••••" />
            </div>

            <button type="button" className="login-button">
              Login
            </button>
          </form>

          <p className="signup-text">
            Don't have an account?{" "}
            <Link to="/register" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
