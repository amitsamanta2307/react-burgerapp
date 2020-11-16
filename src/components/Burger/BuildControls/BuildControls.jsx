import React from 'react';

import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const BuildControls = ({ onIngredientAdded, onIngredientRemoved, disabled }) => (
    <div className={styles.BuildControls}>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label}
                label={ctrl.label}
                onAdded={() => onIngredientAdded(ctrl.type)}
                onRemoved={() => onIngredientRemoved(ctrl.type)}
                disabled={disabled[ctrl.type]}
            />
        ))}
    </div>
);

export default BuildControls;