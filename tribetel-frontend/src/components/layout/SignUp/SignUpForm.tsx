import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./SignUpForm.css";

const SignUpForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [isClicked, setIsClicked] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!validateEmail(email))
      newErrors.email = "Please enter a valid email address.";

    if (!country.trim()) newErrors.country = "Country is required.";

    if (!password.trim()) newErrors.password = "Password is required.";
    else if (!validatePassword(password))
      newErrors.password =
        "Password must be at least 6 characters and include letters and numbers.";

    setError(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsClicked(true);
    console.log("User registered:", { name, email, country, rememberMe });
    setTimeout(() => {
      setIsClicked(true);
      navigate("/success");
    }, 1000);
  };

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2 className="signup-title">Create Account</h2>

      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={error.name ? "input-error" : ""}
      />
      {error.name && <p className="error-text">{error.name}</p>}

      <label htmlFor="email">E-mail</label>
      <input
        type="email"
        id="email"
        placeholder="Username@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={error.email ? "input-error" : ""}
        required
      />
      {error.email && <p className="error-text">{error.email}</p>}

      {/* Country field */}
      <label htmlFor="country">Country</label>
      <input
        type="text"
        id="country"
        placeholder="Country Name"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className={error.country ? "input-error" : ""}
      />
      {error.country && <p className="error-text">{error.country}</p>}

          {/* Password field */}
      <label htmlFor="password">Password</label>
      <div className="password-field">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={error.password ? "input-error" : ""}
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
      {error.password && <p className="error-text">{error.password}</p>}

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

      <button
        type="submit"
        className={`signup-btn ${isClicked ? "clicked" : ""}`}
        disabled={!email || !password || !name || !country}
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
