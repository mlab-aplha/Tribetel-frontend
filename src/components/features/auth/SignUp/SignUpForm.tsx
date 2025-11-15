import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/common/Button/Button';
import Input from '@components/common/Input/Input';
import Loader from '@components/common/Loader/Loader';
import { useAuth } from '@hooks/useAuth';
import './SignUpForm.css';

interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string>('');
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signup(formData.email, formData.password, formData.fullName);
      navigate('/');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  const handleChange = (field: keyof SignUpFormData) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isLoading) {
    return <Loader text="Creating account..." />;
  }

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Create Account</h2>
      
      {error && <div className="error-message">{error}</div>}

      <Input
        label="Full Name"
        type="text"
        value={formData.fullName}
        onChange={handleChange('fullName')}
        required
      />

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

      <Input
        label="Confirm Password"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange('confirmPassword')}
        required
      />

      <Button type="submit" variant="primary" fullWidth>
        Create Account
      </Button>
    </form>
  );
};

export default SignUpForm;
