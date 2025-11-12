import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Reservations from './components/Reservations';
import Rooms from './components/Rooms';
import Users from './components/Users';
import styles from './App.module.css';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'reservations':
        return <Reservations />;
      case 'rooms':
        return <Rooms />;
      case 'users':
        return <Users />;
      case 'messages':
      case 'calendar':
      case 'financials':
      case 'reviews':
      case 'settings':
        return (
          <div className={styles.placeholder}>
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} section coming soon...
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={styles.layout}>
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className={styles.main}>
        <Header />
        <div className={styles.content}>{renderContent()}</div>
      </div>
    </div>
  );
}

export default App;
