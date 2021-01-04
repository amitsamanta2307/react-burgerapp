import React from 'react';

import styles from './BuildControl.module.css';

const BuildControl = ({ label, onAdded, onRemoved, disabled }) => (
    <div className={styles.BuildControl}>
        <div className={styles.Label}>{label}</div>
        <button
            className={styles.Less}
            onClick={onRemoved}
            disabled={disabled}
        >Less</button>
        <button
            className={styles.More}
            onClick={onAdded}
        >More</button>
    </div>
);

export default BuildControl;