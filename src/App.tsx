import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerDashboard from './pages/CustomerDashboard/CustomerDashboard';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Use Header instead of Navbar for the main navigation */}

        <main className="main-content">
          <Routes>
            {/*<Route path="/" element={<LandingPage />} />*/}
            <Route path="/" element={<CustomerDashboard />} />
            <Route path="/hotels" element={<div style={{ paddingTop: '90px', minHeight: '100vh' }}>Hotels Page - Coming Soon</div>} />
            <Route path="/deals" element={<div style={{ paddingTop: '90px', minHeight: '100vh' }}>Deals Page - Coming Soon</div>} />
            <Route path="/vacations" element={<div style={{ paddingTop: '90px', minHeight: '100vh' }}>Vacations Page - Coming Soon</div>} />
            <Route path="/about" element={<div style={{ paddingTop: '90px', minHeight: '100vh' }}>About Page - Coming Soon</div>} />
            <Route path="/contact" element={<div style={{ paddingTop: '90px', minHeight: '100vh' }}>Contact Page - Coming Soon</div>} />
            <Route path="/login" element={<div style={{ paddingTop: '90px', minHeight: '100vh' }}>Login Page - Coming Soon</div>} />
            <Route path="/register" element={<div style={{ paddingTop: '90px', minHeight: '100vh' }}>Register Page - Coming Soon</div>} />
            <Route path="/profile" element={<div style={{ paddingTop: '90px', minHeight: '100vh' }}>Profile Page - Coming Soon</div>} />
            <Route path="/bookings" element={<div style={{ paddingTop: '90px', minHeight: '100vh' }}>Bookings Page - Coming Soon</div>} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;