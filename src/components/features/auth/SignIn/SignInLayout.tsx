import React from 'react';
import { Link } from 'react-router-dom';
import './SignInLayout.css';

interface SignInLayoutProps {
  children: React.ReactNode;
}

const SignInLayout: React.FC<SignInLayoutProps> = ({ children }) => {
  return (
    <div className="signin-layout">
      <div className="signin-container">
        <div className="signin-left">
          <div className="signin-image-overlay"></div>
          <img
            src="/src/assets/logo-.svg"
            alt="Tribtel Logo"
            className="signin-logo"
          />
          <h1 className="signin-brand">TRIBETL</h1>
          <p className="signin-tagline">
            Experience luxury redefined with exceptional service and unforgettable moments
          </p>

          {/* Optional feature list */}
          <div className="signin-features">
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <span>Luxury Accommodations</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <span>24/7 Customer Support</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <span>Best Price Guarantee</span>
            </div>
          </div>
        </div>

        <div className="signin-right">
          {children}

          <div className="signup-section">
            <p className="signup-text">
              Don't have an account?{' '}
              <Link to="/register" className="signup-link">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInLayout;