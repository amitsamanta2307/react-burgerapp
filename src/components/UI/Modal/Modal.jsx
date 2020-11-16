import React from 'react';

import Backdrop from '../Backdrop/Backdrop';

import styles from './Modal.module.css';

const Modal = ({ show, onModalClosed, children }) => (
    <React.Fragment>
        <Backdrop show={show} onClicked={onModalClosed} />
        <div 
            className={styles.Modal}
            style={{
                transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: show ? '1' : '0'
            }}
        >
            {children}
        </div>
    </React.Fragment>
);

export default Modal;