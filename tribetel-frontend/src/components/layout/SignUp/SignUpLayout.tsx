import React from "react";
import logo from "../../../Assets/tribtel-logo.png";
import "./SignUpLayout.css";

interface SignInLayoutProps {
  children: React.ReactNode;
}

const SignInLayout: React.FC<SignInLayoutProps> = ({ children }) => {
  return (
    <div className="signin-container">
      <div className="signin-left">
        <img src={logo} alt="Tribtel Logo" className="signin-logo" />
        <h1 className="signin-brand">Tribtel</h1>
      </div>
      
      <div className="signin-right">{children}</div>
    </div>
  );
};

export default SignInLayout;

