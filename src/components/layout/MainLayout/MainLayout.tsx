import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.mainContent}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;