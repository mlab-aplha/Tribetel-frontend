
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import MainLayout from './components/layout/MainLayout/MainLayout';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import SearchResultsPage from './pages/SearchResultsPage/Search_ResultsPage';
import HotelListings from './pages/hotel-listings-page/HotelListings';
import BookingPage from './pages/BookingPage/BookingPage';
import CustomerDashboard from './pages/CustomerDashboard/CustomerDashboard';
import MyBookingsPage from './pages/MyBookingsPage/MyBookingsPage';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import AdminSignInForm from './components/features/auth/AdminSignIn/AdminSignInForm';
import AdminLayout from './components/features/auth/AdminSignIn/AdminLayout';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProtectedRoute from './components/features/auth/ProtectedRoute/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<MainLayout><SearchResultsPage /></MainLayout>} />
          <Route path="/hotels" element={<MainLayout><HotelListings /></MainLayout>} />
          
          {/* Protected Customer Routes */}
          <Route path="/booking" element={
            <ProtectedRoute>
              <MainLayout><BookingPage /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <MainLayout><CustomerDashboard /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/my-bookings" element={
            <ProtectedRoute>
              <MainLayout><MyBookingsPage /></MainLayout>
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/signin" element={<AdminLayout><AdminSignInForm /></AdminLayout>} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


