import React, { useState } from 'react';
import { connect } from 'react-redux';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import styles from './Layout.module.css';

const Layout = ({ isAuthenticated, children }) => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    };

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    };

    return (
        <React.Fragment>
            <Toolbar 
                isAuthenticated={isAuthenticated}
                onDrawerToggleClicked={sideDrawerToggleHandler}
            />
            <SideDrawer
                isAuthenticated={isAuthenticated}
                open={sideDrawerIsVisible} 
                closed={sideDrawerClosedHandler} />
            <main className={styles.Content}>
                {children}
            </main>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

export default connect(mapStateToProps)(Layout);