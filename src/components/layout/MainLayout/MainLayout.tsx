import React from 'react';
import './MainLayout.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (

        <div className="layout">
            <Header />
            <main className="layout-main">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;