import React from "react"; 
import "./AdminLayout.css"; 
import logo from "../../../assets/tribtel-logo.png";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="signin-container">
      {/* Left side - Branding */}
      <div className="signin-left">
        <img src={logo} alt="Tribtel-logo" className="signin-logo" />
        <h1 className="signin-brand">Tribtel</h1>
      </div>

      {/* Right side - Form */}
      <div className="signin-right">{children}</div>
    </div>
  );
};

export default AdminLayout;
