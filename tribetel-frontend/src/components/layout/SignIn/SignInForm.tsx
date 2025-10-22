<<<<<<< HEAD

=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./SignInForm.css";

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

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
      {/*Admin button*/}
      <div className="form-header">
        <button
          type="button"
          className="admin-btn"
          onClick={() => navigate("/admin-signin")}
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
        disabled={!email || !password}
      >
        Sign in
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
>>>>>>> feature/signin-layout
