import React from 'react';

import styles from './Modal.module.css';

const Modal = ({ show, children }) => (
    <div 
        className={styles.Modal}
        style={{
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? '1' : '0'
        }}
    >
        {children}
    </div>
);

export default Modal;