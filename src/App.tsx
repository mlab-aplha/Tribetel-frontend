import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import MainLayout from './components/layout/MainLayout/MainLayout';
import LandingPage from './pages/LandingPage/LandingPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import RoomsPage from './pages/RoomsPage/RoomsPage';
import RoomDetailsPage from './pages/RoomDetailsPage/RoomDetailsPage';
import BookingPage from './pages/BookingPage/BookingPage';
import CustomerDashboard from './pages/CustomerDashboard/CustomerDashboard';
import MyBookingsPage from './pages/MyBookingsPage/MyBookingsPage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import SearchFilterPage from './pages/search-filter-page/SearchFilterPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProtectedRoute from './components/features/auth/ProtectedRoute/ProtectedRoute';
import AdminSignIn from './components/features/auth/AdminSignIn/AdminSignIn';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes with Main Layout */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="rooms" element={<RoomsPage />} />
                <Route path="rooms/:roomId" element={<RoomDetailsPage />} />
                <Route path="search-results" element={<SearchResultsPage />} />
                <Route path="search-filter" element={<SearchFilterPage />} />
                <Route path="hotels" element={<RoomsPage />} />


                {/* Protected Routes */}
                <Route
                  path="booking/:roomId"
                  element={
                    <ProtectedRoute>
                      <BookingPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute>
                      <CustomerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="my-bookings"
                  element={
                    <ProtectedRoute>
                      <MyBookingsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="profile"
                  element={
                    <ProtectedRoute>
                      <CustomerDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes */}
                <Route path="admin/signin" element={<AdminSignIn />} />

                {/* 404 Page */}
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;