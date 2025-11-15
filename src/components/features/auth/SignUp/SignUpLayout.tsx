import React from "react";
import logo from "../../../../assets/tribtel-logo.png";
import "./SignUpLayout.css";

interface SignUpLayoutProps {
  children: React.ReactNode;
}

const SignUpLayout: React.FC<SignUpLayoutProps> = ({ children }) => {
  return (
    <div className="signup-container">
      <div className="signup-left">
        <img src={logo} alt="Tribtel Logo" className="signup-logo" />
        <h1 className="signup-brand">Tribtel</h1>
      </div>

      <div className="signup-right">{children}</div>
    </div>
  );
};

export default SignUpLayout;


