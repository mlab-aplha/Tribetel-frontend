import { ChevronDown, LogOut } from 'lucide-react';
import styles from './Header.module.css';

interface HeaderProps {
  userName?: string;
  userRole?: string;
  onLogout?: () => void;
}

export default function Header({
  userName = 'Admin',
  userRole = 'Hotel Manager',
  onLogout
}: HeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.greeting}>
          Hello, <span className={styles.greetingName}>{userName}</span>
        </div>
        <div className={styles.greetingSubtext}>Have a nice day</div>
        <h1 className={styles.title}>Hotel Manager</h1>
      </div>
      <div className={styles.headerRight}>
        <div className={styles.userInfo}>
          <div className={styles.userName}>{userName}</div>
          <div className={styles.userRole}>{userRole}</div>
        </div>
        <div className={styles.avatar}>
          <ChevronDown size={20} />
        </div>
        {onLogout && (
          <button className={styles.logoutButton} onClick={onLogout} title="Logout">
            <LogOut size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

