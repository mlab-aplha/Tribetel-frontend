import React from 'react';
import { ModalProps } from '../../types/common';
import styles from './Modal.module.css';

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