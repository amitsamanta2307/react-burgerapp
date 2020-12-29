import React from 'react';
import { connect } from 'react-redux';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import styles from './Layout.module.css';

class Layout extends React.Component {
    state = {
        showSideDrawer: false,
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => ({ showSideDrawer: !prevState.showSideDrawer }));
    };

    render () {
        return (
            <React.Fragment>
                <Toolbar 
                    isAuthenticated={this.props.isAuthenticated}
                    onDrawerToggleClicked={this.sideDrawerToggleHandler}
                />
                <SideDrawer
                    isAuthenticated={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler} />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

export default connect(mapStateToProps)(Layout);