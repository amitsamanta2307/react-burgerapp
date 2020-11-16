import React from 'react';

import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = ({ ingredients }) => {

    let transformedIngredients = Object.keys(ingredients)
        .map(igKey => {
            return [...Array(ingredients[igKey])].map((_, index) => {
                return <BurgerIngredient key={igKey + index} type={igKey} />;
            })
        })
        .reduce((previous, current) => {
            return previous.concat(current);
        }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default Burger;