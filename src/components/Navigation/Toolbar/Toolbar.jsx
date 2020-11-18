import React from 'react';

import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItems from '../NavigationItems/NavigationItems';

import styles from './Toolbar.module.css';

const Toolbar = (props) => (
    <header className={styles.Toolbar}>
        <DrawerToggle onClicked={props.onDrawerToggleClicked} />
        <div className={styles.Logo}>
            <Logo />
        </div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default Toolbar;