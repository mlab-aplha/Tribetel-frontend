import React from 'react';
import './SignInLayout.css';

interface SignInLayoutProps {
  children: React.ReactNode;
}

const SignInLayout: React.FC<SignInLayoutProps> = ({ children }) => {
  return (
    <div className="signin-layout">
      <div className="signin-container">
        {children}
      </div>
    </div>
  );
};

export default SignInLayout;