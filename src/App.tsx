import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import LandingPage from './pages/LandingPage/LandingPage';
import BookingPage from './pages/BookingPage/BookingPage';
import CustomerDashboard from './pages/CustomerDashboard/CustomerDashboard';
import MyBookingsPage from './pages/MyBookingsPage/MyBookingsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import SearchResultsPage from './pages/SearchResultsPage/Search_ResultsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ProtectedRoute from './components/features/auth/ProtectedRoute/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes - Customer Facing */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/dashboard" element={<CustomerDashboard />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Authentication Routes */}
            <Route path="/login/*" element={<LoginPage />} />

            {/* Protected Admin Routes - CRM */}
            <Route
              path="/admin/dashboard/*"
              element={
                <ProtectedRoute requireAuth={true} adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;