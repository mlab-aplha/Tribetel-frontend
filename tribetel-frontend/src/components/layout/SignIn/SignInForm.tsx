import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./SignInForm.css";

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");
    setIsClicked(true);
    console.log("Form submitted:", { email, password });  

    setTimeout(() => setIsClicked(false), 1000);
  };

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      {/*Admin button container*/} 
       <div className="form-header">
        <button
          type="button"
          className="admin-btn"
          onClick={() => (window.location.href = "/admin-login")}
        >
          Admin Login
        </button>
      </div>

      <h2 className="signin-title">Sign In</h2>

      <label htmlFor="email">E-mail</label>
      <input
        type="email"
        id="email"
        placeholder="Username@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="password">Password</label>
      <div className="password-field">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="toggle-password"
          onClick={toggleVisibility}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible />
          ) : (
            <AiOutlineEye />
          )}
        </button>
      </div>

      <div className="form-options">
        <label className="remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember me
        </label>

        <a href="#" className="forgot-password">
          Forgot password?
        </a>
      </div>

      {error && <p className="error-text">{error}</p>}

      <button
        type="submit"
        className={`signin-btn ${isClicked ? "clicked" : ""}`}
        disabled={!email || !password}
      >
        Sign in
      </button>

      <p className="terms-text">
        By signing up you agree to our <a href="#">terms and conditions</a>.
      </p>

      <p className="register-text">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </form>
  );
};

export default SignInForm;
