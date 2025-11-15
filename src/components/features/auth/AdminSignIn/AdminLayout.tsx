import React from "react";
import "./AdminLayout.css";
import logo from "../../../../assets/tribtel-logo.png";
import { AdminLayoutProps } from '../../../types/common';

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  logo: customLogo = logo,
  brandName = "Tribtel",
  className = "",
  showBranding = true,
  backgroundImage,
  theme = 'default'
}) => {
  return (
    <div className={`admin-container ${className} ${theme}`}>
      {showBranding && (
        <div
          className="admin-left"
          style={backgroundImage ? {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          } : undefined}
        >
          <div className="branding-content">
            <img
              src={customLogo}
              alt={`${brandName} logo`}
              className="signin-logo"
            />
            <h1 className="signin-brand">{brandName}</h1>
            <p className="brand-tagline">
              Luxury Hospitality Management
            </p>
          </div>


        </div>
      )}

      {/* Right side - Form/Content */}
      <div className={`signin-right ${!showBranding ? 'full-width' : ''}`}>
        <div className="content-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

