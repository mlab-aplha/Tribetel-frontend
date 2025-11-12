import { LayoutDashboard, Calendar, Home, MessageSquare, CalendarDays, DollarSign, Star, Settings, Users } from 'lucide-react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  unreadMessages?: number;
}

export default function Sidebar({ activeSection, onSectionChange, unreadMessages = 8 }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'reservations', label: 'Reservations', icon: Calendar },
    { id: 'rooms', label: 'Rooms', icon: Home },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadMessages },
    { id: 'calendar', label: 'Calendar', icon: CalendarDays },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>🏨</div>
        <div className={styles.logoText}>Tribtel</div>
      </div>
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`${styles.navItem} ${activeSection === item.id ? styles.active : ''}`}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className={styles.navIcon} />
              <span>{item.label}</span>
              {item.badge && <span className={styles.badge}>{item.badge}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
