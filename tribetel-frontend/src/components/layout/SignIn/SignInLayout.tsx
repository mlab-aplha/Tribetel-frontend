import React from "react"; 
import "./SignInLayout.css"; 

interface SignInLayoutProps {
  children: React.ReactNode;
}

const SignInLayout: React.FC<SignInLayoutProps> = ({ children }) => {
  return (
    <div className="signin-container">
      {/* Left side - Branding */}
      <div className="signin-left">
        <img src="" alt="Tribtel-logo" className="signin-logo" />
        <h1 className="signin-brand">Tribtel</h1>
      </div>

      {/* Right side - Form */}
      <div className="signin-right">{children}</div>
    </div>
  );
};

export default SignInLayout;
