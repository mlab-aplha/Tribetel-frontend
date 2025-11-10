import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import pages
import HomePage from './pages/LandingPage/LandingPage';
import SearchResultsPage from './pages/SearchResultsPage/Search_ResultsPage';
import BookingPage from './pages/BookingPage/BookingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MyBookingsPage from './pages/MyBookingsPage/MyBookingsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

// Import layout
import Layout from './components/layout/MainLayout/MainLayout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/signin/*" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/bookings" element={<MyBookingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;