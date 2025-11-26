import TestConnection from './components/features/TestConnection';
import './App.css';

function App() {
  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          color: '#2c5530',
          textAlign: 'center',
          marginBottom: '10px'
        }}>
          🏨 Hotel Booking API Test
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '30px'
        }}>
          Testing connection to: <strong>https://hotel-backend-hub-dyfd.onrender.com</strong>
        </p>
        <TestConnection />
      </div>
    </div>
  );
}

export default App;
