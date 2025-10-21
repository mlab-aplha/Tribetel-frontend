import React, { useState } from "react";

const AdminSignInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");
    console.log("Admin Sign-in:", { email, password });
  };

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="admin-signin-form" onSubmit={handleSubmit}>
      <h2>Admin Sign In Form</h2>
      <label htmlFor="admin-email">Admin E-mail</label>
      <input
        type="email"
        id="admin-email"
        placeholder="admin@tribtel.com"
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
          {/* {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />} */}
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}
    </form>
  );
};

export default AdminSignInForm;
