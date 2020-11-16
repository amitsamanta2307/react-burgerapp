import React from 'react';

import styles from './BuildControl.module.css';

const BuildControl = ({ label }) => (
    <div className={styles.BuildControl}>
        <div className={styles.Label}>{label}</div>
        <button className={styles.Less}>Less</button>
        <button className={styles.More}>More</button>
    </div>
);

export default BuildControl;