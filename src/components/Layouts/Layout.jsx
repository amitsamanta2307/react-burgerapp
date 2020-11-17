import React from 'react';

import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';

import styles from './Layout.module.css';

const Layout = (props) => (
    <React.Fragment>
        <Toolbar />
        <SideDrawer />
        <main className={styles.Content}>
            {props.children}
        </main>
    </React.Fragment>
);

export default Layout;