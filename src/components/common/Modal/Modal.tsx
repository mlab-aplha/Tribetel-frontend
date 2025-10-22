import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    className?: string;
}

const Modal: React.FC<ModalProps> = ({
    children,
    isOpen,
    onClose,
    className = ''
}) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div
                className={`${styles.modal} ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;