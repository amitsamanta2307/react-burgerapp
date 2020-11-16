import React from 'react';

import styles from './Modal.module.css';

const Modal = ({children}) => (
    <div className={styles.Modal}>
        {children}
    </div>
);

export default Modal;