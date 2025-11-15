import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./SignInForm.css";
import { useAuth } from '../../../../hooks/useAuth';

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const { login, isLoading } = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsClicked(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsClicked(false);
    }
  };

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <button
          type="button"
          className="admin-btn"
          onClick={() => navigate("/admin/signin")}
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
        disabled={!email || !password || isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>

      <p className="register-text">
        Don't have an account?{" "}
        <span onClick={() => navigate("/signup")} className="signup-link">
          Sign up
        </span>
      </p>
    </form>
  );
};

export default SignInForm;