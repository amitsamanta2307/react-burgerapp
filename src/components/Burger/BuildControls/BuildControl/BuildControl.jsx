import React from 'react';

import styles from './BuildControl.module.css';

const BuildControl = ({ label, onAdded }) => (
    <div className={styles.BuildControl}>
        <div className={styles.Label}>{label}</div>
        <button className={styles.Less}>Less</button>
        <button className={styles.More} onClick={onAdded}>More</button>
    </div>
);

export default BuildControl;