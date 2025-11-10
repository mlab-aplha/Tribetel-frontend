import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import "./SignUpForm.css";
import { useAuth } from '../../../../hooks/useAuth';
import Loader from '../../../common/Loader/Loader';

interface SignUpFormData {
  name: string;
  email: string;
  country: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  newsletter: boolean;
}

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    country: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    newsletter: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signup, isLoading } = useAuth(); // Use signup instead of register
  const navigate = useNavigate();

  // Password strength indicators
  const passwordRequirements = {
    minLength: formData.password.length >= 6,
    hasNumber: /\d/.test(formData.password),
    hasUpperCase: /[A-Z]/.test(formData.password),
    hasLowerCase: /[a-z]/.test(formData.password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };

  const isPasswordStrong = Object.values(passwordRequirements).every(Boolean);

  const validateField = (name: string, value: string | boolean): string => {
    switch (name) {
      case 'name':
        if (!value) return "Name is required.";
        if (typeof value === 'string' && value.trim().length < 2) return "Name must be at least 2 characters long.";
        return "";

      case 'email':
        if (!value) return "Email is required.";
        if (typeof value === 'string') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) return "Please enter a valid email address.";
        }
        return "";

      case 'country':
        if (!value) return "Country is required.";
        return "";

      case 'phone':
        if (value && typeof value === 'string') {
          const phoneRegex = /^\+?[\d\s-()]+$/;
          if (!phoneRegex.test(value)) return "Please enter a valid phone number.";
        }
        return "";

      case 'password':
        if (!value) return "Password is required.";
        if (typeof value === 'string') {
          if (value.length < 6) return "Password must be at least 6 characters long.";
          if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            return "Password must include uppercase, lowercase letters and numbers.";
          }
        }
        return "";

      case 'confirmPassword':
        if (!value) return "Please confirm your password.";
        if (value !== formData.password) return "Passwords do not match.";
        return "";

      case 'acceptTerms':
        if (!value) return "You must accept the terms and conditions.";
        return "";

      default:
        return "";
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof SignUpFormData]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof SignUpFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleInputBlur = (field: keyof SignUpFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as { [key: string]: boolean });
    setTouched(allTouched);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Call signup with only the required parameters
      await signup(formData.email, formData.password, formData.name);

      console.log("Registration successful");
      navigate("/");
    } catch (error: any) {
      console.error("Registration error:", error);
      setErrors({
        submit: error.message || "Registration failed. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
    <div className={`password-requirement ${met ? 'met' : 'not-met'}`}>
      {met ? <AiOutlineCheck className="requirement-icon" /> : <AiOutlineClose className="requirement-icon" />}
      <span>{text}</span>
    </div>
  );

  return (
    <form className="signup-form" onSubmit={handleSubmit} noValidate>
      <div className="form-header">
        <h2 className="signup-title">Create Your Account</h2>
        <p className="signup-subtitle">Join Tribtel for exclusive deals and seamless booking</p>
      </div>

      {/* Name Field */}
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          onBlur={() => handleInputBlur('name')}
          className={`form-input ${errors.name && touched.name ? 'input-error' : ''}`}
          required
          disabled={isLoading || isSubmitting}
        />
        {errors.name && touched.name && <span className="error-text">{errors.name}</span>}
      </div>

      {/* Email Field */}
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          placeholder="username@example.com"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          onBlur={() => handleInputBlur('email')}
          className={`form-input ${errors.email && touched.email ? 'input-error' : ''}`}
          required
          disabled={isLoading || isSubmitting}
        />
        {errors.email && touched.email && <span className="error-text">{errors.email}</span>}
      </div>

      {/* Country Field */}
      <div className="form-group">
        <label htmlFor="country" className="form-label">
          Country *
        </label>
        <select
          id="country"
          value={formData.country}
          onChange={(e) => handleInputChange('country', e.target.value)}
          onBlur={() => handleInputBlur('country')}
          className={`form-input ${errors.country && touched.country ? 'input-error' : ''}`}
          required
          disabled={isLoading || isSubmitting}
        >
          <option value="">Select your country</option>
          <option value="South Africa">South Africa</option>
          <option value="United States">United States</option>
        </select>
        {errors.country && touched.country && <span className="error-text">{errors.country}</span>}
      </div>

      {/* Phone Field */}
      <div className="form-group">
        <label htmlFor="phone" className="form-label">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          placeholder="+27 12 345 6789"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          onBlur={() => handleInputBlur('phone')}
          className={`form-input ${errors.phone && touched.phone ? 'input-error' : ''}`}
          disabled={isLoading || isSubmitting}
        />
        {errors.phone && touched.phone && <span className="error-text">{errors.phone}</span>}
      </div>

      {/* Password Field */}
      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Password *
        </label>
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            onBlur={() => handleInputBlur('password')}
            className={`form-input ${errors.password && touched.password ? 'input-error' : ''}`}
            required
            disabled={isLoading || isSubmitting}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={togglePasswordVisibility}
            disabled={isLoading || isSubmitting}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>
        {errors.password && touched.password && <span className="error-text">{errors.password}</span>}

        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="password-strength">
            <div className="strength-bar">
              <div
                className={`strength-fill ${isPasswordStrong ? 'strong' : formData.password.length >= 6 ? 'medium' : 'weak'}`}
                style={{ width: `${(Object.values(passwordRequirements).filter(Boolean).length / 5) * 100}%` }}
              ></div>
            </div>
            <div className="password-requirements">
              <PasswordRequirement met={passwordRequirements.minLength} text="At least 6 characters" />
              <PasswordRequirement met={passwordRequirements.hasNumber} text="Contains a number" />
              <PasswordRequirement met={passwordRequirements.hasUpperCase} text="Uppercase letter" />
              <PasswordRequirement met={passwordRequirements.hasLowerCase} text="Lowercase letter" />
              <PasswordRequirement met={passwordRequirements.hasSpecialChar} text="Special character" />
            </div>
          </div>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="form-group">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password *
        </label>
        <div className="password-field">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            onBlur={() => handleInputBlur('confirmPassword')}
            className={`form-input ${errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}`}
            required
            disabled={isLoading || isSubmitting}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={toggleConfirmPasswordVisibility}
            disabled={isLoading || isSubmitting}
          >
            {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>
        {errors.confirmPassword && touched.confirmPassword && (
          <span className="error-text">{errors.confirmPassword}</span>
        )}
      </div>

      {/* Terms and Newsletter */}
      <div className="form-options">
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
              onBlur={() => handleInputBlur('acceptTerms')}
              className={errors.acceptTerms && touched.acceptTerms ? 'input-error' : ''}
              disabled={isLoading || isSubmitting}
            />
            <span className="checkmark"></span>
            I agree to the <Link to="/terms" className="link">Terms and Conditions</Link> and <Link to="/privacy" className="link">Privacy Policy</Link> *
          </label>
          {errors.acceptTerms && touched.acceptTerms && (
            <span className="error-text">{errors.acceptTerms}</span>
          )}
        </div>

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.newsletter}
              onChange={(e) => handleInputChange('newsletter', e.target.checked)}
              disabled={isLoading || isSubmitting}
            />
            <span className="checkmark"></span>
            Send me exclusive deals and travel inspiration
          </label>
        </div>
      </div>

      {/* Submit Error */}
      {errors.submit && <div className="error-banner">{errors.submit}</div>}

      {/* Submit Button */}
      {isLoading || isSubmitting ? (
        <div className="submit-loading">
          <Loader text="Creating your account..." size="small" />
        </div>
      ) : (
        <button
          type="submit"
          className="signup-btn"
          disabled={isLoading || isSubmitting}
        >
          Create Account
        </button>
      )}

      {/* Login Link */}
      <p className="login-text">
        Already have an account?{" "}
        <Link to="/signin" className="signin-link">
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;