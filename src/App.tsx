import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import MainLayout from './components/layout/MainLayout/MainLayout';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import SearchResultsPage from './pages/SearchResultsPage/Search_ResultsPage';
import HotelListings from './pages/hotel-listings-page/HotelListings';
import BookingPage from './pages/BookingPage/BookingPage';
import PaymentForm from './components/features/booking/PaymentForm/PaymentForm';
import CustomerDashboard from './pages/CustomerDashboard/CustomerDashboard';
import MyBookingsPage from './pages/MyBookingsPage/MyBookingsPage';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProtectedRoute from './components/features/auth/ProtectedRoute/ProtectedRoute';
import SignInLayout from './components/features/auth/SignIn/SignInLayout';
import SignInForm from './components/features/auth/SignIn/SignInForm';
import AdminLayout from './components/features/auth/AdminSignIn/AdminLayout';
import AdminSignInForm from './components/features/auth/AdminSignIn/AdminSignInForm';
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

          {/* Sign In Routes */}
          <Route path="/signin" element={
            <SignInLayout>
              <SignInForm />
            </SignInLayout>
          } />
          <Route path="/admin/signin" element={
            <AdminLayout>
              <AdminSignInForm
                onSubmit={handleAdminSignIn}
                onSuccess={handleAdminSuccess}
                onError={handleAdminError}
                allowedDomains={["@tribtel.com"]}
                redirectPath="/admin/dashboard"
              />
            </AdminLayout>
          } />

          {/* Booking Flow Routes */}
          <Route path="/booking" element={
            <ProtectedRoute>
              <MainLayout><BookingPage /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/payment" element={
            <ProtectedRoute>
              <MainLayout><PaymentForm /></MainLayout>
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
const handleAdminSignIn = async (formData: any) => {
  console.log('Admin signing in:', formData);

  if (formData.email === "admin@tribtel.com" && formData.password === "admin123") {
    localStorage.setItem('adminAuthenticated', 'true');
    localStorage.setItem('adminUser', JSON.stringify(formData));
    return Promise.resolve();
  } else {
    return Promise.reject(new Error("Invalid admin credentials"));
  }
};

const handleAdminSuccess = () => {
  console.log('Admin login successful');
};

const handleAdminError = (error: string) => {
  console.error('Admin login error:', error);
};

export default App;