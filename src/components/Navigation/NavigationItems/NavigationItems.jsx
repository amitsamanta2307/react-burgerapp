import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css'

const NavigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exact>
            Burger Builder
        </NavigationItem>
        {props.isAuthenticated
            ? <NavigationItem link="/orders">Orders</NavigationItem>
            : null
        }
        {!props.isAuthenticated 
            ? <NavigationItem link="/auth">Authentication</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>
        }
    </ul>
);

export default NavigationItems;