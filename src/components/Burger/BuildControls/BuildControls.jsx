import React from 'react';

import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const BuildControls = ({ 
    onIngredientAdded,
    onIngredientRemoved,
    onOrdered,
    disabled,
    price,
    purchasable,
    isAuthenticated
}) => (
    <div className={styles.BuildControls}>
        <p>Current Price: <strong>{price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label}
                label={ctrl.label}
                onAdded={() => onIngredientAdded(ctrl.type)}
                onRemoved={() => onIngredientRemoved(ctrl.type)}
                disabled={disabled[ctrl.type]}
            />
        ))}
        <button 
            className={styles.OrderButton}
            disabled={!purchasable}
            onClick={onOrdered}>
                {isAuthenticated ? 'ORDER NOW' : 'SIGN IN TO ORDER'}
        </button>
    </div>
);

export default BuildControls;