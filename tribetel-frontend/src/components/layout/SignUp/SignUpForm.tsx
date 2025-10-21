import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./SignUpForm.css";

const SignUpForm: React.FC = () => {
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
    console.log("Logging in:", { email, password, rememberMe });

    setTimeout(() => setIsClicked(false), 1500);
  };

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2 className="signup-title">Create Account</h2>

      <label htmlFor="name">Name</label>
      <input type="text" id="name" placeholder="Enter your name" />

      <label htmlFor="email">E-mail</label>
      <input
        type="email"
        id="email"
        placeholder="Username@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      /> 
      <label htmlFor="country">Country</label>
      <input type="text" id="country" placeholder="Country Name" />

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
        className={`signup-btn ${isClicked ? "clicked" : ""}`}
        disabled={!email || !password}
      >
        Sign Up
      </button>

      <p className="login-text">
        Already have an account?{" "}
        <span onClick={() => navigate("/signin")} className="signin-link">
          Sign In
        </span>
      </p>

      <p className="terms-text">
        By signing up you agree to our <a href="#">Terms and Conditions</a> at
        Zoho.
      </p>
    </form>
  );
};

export default SignUpForm;
