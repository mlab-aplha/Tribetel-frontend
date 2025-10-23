import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./AdminSignInForm.css";

const AdminSignInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
      if (!email.toLowerCase().endsWith("@tribtel.com")) {
      setError("Access denied. Only @tribtel.com can sign in.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setError("");
    setIsClicked(true);
    
    console.log("Admin Sign-in:", { email, password });
    setTimeout(() => {
      setIsClicked(false);
      navigate("/admin/dashboard");
    }, 1000);
  };

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="admin-signin-form" onSubmit={handleSubmit}>
      <h2>Admin Sign In</h2>

      {/* E-mail Field */}
      <label htmlFor="admin-email">Admin E-mail</label>
      <input
        type="email"
        id="admin-email"
        placeholder="admin@tribtel.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={error.includes("email") ? "input-error" : ""}
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
          className={error.includes("Password") ? "input-error" : ""}
          required
        />
        <button
          type="button"
          className="toggle-password"
          onClick={toggleVisibility}
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="options">
        <label className="remember-me">
          <input type="checkbox" /> Remember me
        </label>
        <a href="#" className="forgot-password">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className={`signin-btn ${isClicked ? "clicked" : ""}`}
        disabled={!email || !password}
      >
        Sign In
      </button>

      <p className="switch-text">
        Not an admin?{" "}
        <span onClick={() => navigate("/signin")} className="user-signin-link">
          User Sign-In
        </span>
      </p>
    </form>
  );
};

export default AdminSignInForm;
