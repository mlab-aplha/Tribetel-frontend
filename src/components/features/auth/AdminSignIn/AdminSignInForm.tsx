import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./AdminSignInForm.css";
import Button from '../../../common/Button/Button';
import Input from '../../../common/Input/Input';
import Loader from '../../../common/Loader/Loader';
import { AdminSignInFormProps, AdminSignInFormData } from '../../../types/common';

const AdminSignInForm: React.FC<AdminSignInFormProps> = ({
  onSubmit = async (data: AdminSignInFormData) => {
    console.log("Admin Sign-in:", data);
    await new Promise(resolve => setTimeout(resolve, 1000));
  },
  onSuccess,
  onError,
  allowedDomains = ["@tribtel.com"],
  redirectPath = "/admin/dashboard",
  isLoading: externalLoading = false
}) => {
  const [formData, setFormData] = useState<AdminSignInFormData>({
    email: "",
    password: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const isLoading = externalLoading || isSubmitting;

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    const isAllowedDomain = allowedDomains.some(domain =>
      email.toLowerCase().endsWith(domain.toLowerCase())
    );

    if (!isAllowedDomain) {
      return `Access denied. Only ${allowedDomains.join(', ')} emails can sign in.`;
    }

    return null;
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return "Please fill in both fields.";
    }

    const emailError = validateEmail(formData.email);
    if (emailError) return emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) return passwordError;

    return null;
  };

  const handleInputChange = (field: keyof AdminSignInFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      onError?.(validationError);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await onSubmit(formData);
      setError("");
      onSuccess?.();
      console.log("Admin sign in successful");
      navigate(redirectPath);

    } catch (error: any) {
      console.error("Admin sign in error:", error);
      const errorMessage = error.message || "Sign in failed. Please try again.";
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUserSignIn = () => {
    navigate("/signin");
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
  };

  const PasswordInput = () => (
    <div className="password-field">
      <Input
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={(value) => handleInputChange('password', value)}
        placeholder="Enter Password"
        id="password"
        required={true}
        disabled={isLoading}
        className={error.includes('Password') ? "input-error" : ""}
      />
      <button
        type="button"
        className="toggle-password"
        onClick={togglePasswordVisibility}
        disabled={isLoading}
      >
        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </button>
    </div>
  );

  return (
    <form className="admin-signin-form" onSubmit={handleSubmit}>
      <h2>Admin Sign In</h2>

      {error && <p className="error-text">{error}</p>}

      <label htmlFor="admin-email">Admin E-mail</label>
      <Input
        type="email"
        value={formData.email}
        onChange={(value) => handleInputChange('email', value)}
        placeholder="admin@tribtel.com"
        id="admin-email"
        required={true}
        disabled={isLoading}
        className={error.includes('email') ? "input-error" : ""}
      />

      <label htmlFor="password">Password</label>
      <PasswordInput />

      <div className="options">
        <button
          type="button"
          className="forgot-password"
          onClick={handleForgotPassword}
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 0' }}>
          <Loader text="Signing in..." size="small" />
        </div>
      ) : (
        <Button
          type="submit"
          variant="primary"
          size="large"
          disabled={!formData.email || !formData.password || isLoading}
          fullWidth={false}
          className="signin-btn"
          style={{
            display: 'block',
            margin: '0.5rem auto',
            backgroundColor: '#441d68',
            color: 'rgb(243, 230, 115)',
            border: 'none',
            padding: '0.8rem 2rem',
            width: '50%',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Sign In
        </Button>
      )}

      <p className="switch-text">
        Not an admin?{" "}
        <span
          onClick={handleUserSignIn}
          className="user-signin-link"
        >
          User Sign-In
        </span>
      </p>
    </form>
  );
};

export default AdminSignInForm;