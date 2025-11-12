import { ChevronDown } from 'lucide-react';
import styles from './Header.module.css';

interface HeaderProps {
  userName?: string;
  userRole?: string;
}

export default function Header({ userName = 'Admin', userRole = 'Hotel Manager' }: HeaderProps) {
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
          <div className={styles.userName}>{userName} name</div>
          <div className={styles.userRole}>{userRole}</div>
        </div>
        <div className={styles.avatar}>
          <ChevronDown size={20} />
        </div>
      </div>
    </div>
  );
}
