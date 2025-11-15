import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/common/Button/Button';
import Input from '@components/common/Input/Input';
import Loader from '@components/common/Loader/Loader';
import { useAuth } from '@hooks/useAuth';
import './SignInForm.css';

interface SignInFormData {
  email: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
    }
  };

  const handleChange = (field: keyof SignInFormData) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isLoading) {
    return <Loader text="Signing in..." />;
  }

  return (
    <form onSubmit={handleSubmit} className="signin-form">
      <h2>Sign In</h2>
      
      {error && <div className="error-message">{error}</div>}

      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange('email')}
        required
      />

      <Input
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange('password')}
        required
      />

      <Button type="submit" variant="primary" fullWidth>
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
