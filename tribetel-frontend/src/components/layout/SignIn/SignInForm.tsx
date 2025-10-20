import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./SignInForm.css";

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");
    console.log("Logging in:", { email, password });
  };

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <form className="signin-form" onSubmit={handleSubmit}>
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
          onClick= {toggleVisibility}
           >
          {showPassword ? <AiOutlineEyeInvisible></AiOutlineEyeInvisible> :<AiOutlineEye></AiOutlineEye> }
           </button>
      </div>

      {error && <p className="error-text">{error}</p>}

      <button
        type="submit"
        className="signin-btn"
        disabled={!email || !password}
      >
        Sign in
      </button>

      <p className="terms-text">
        By signing up you agree to our{" "}
        <a href="#">terms and conditions</a>.
      </p>

      <p className="register-text">
        Don’t have an account? <a href="/register">Register</a>
      </p>
    </form>
  );
};

export default SignInForm;
