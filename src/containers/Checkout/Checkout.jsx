import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = props => {

    const handleCheckoutCancel = () => {
        props.history.goBack();
    };

    const handleCheckoutContinue = () => {
        props.history.replace('/checkout/contact-data');
    };

    return props.ingredients
        ? <div>
            {props.purchased ? <Redirect to="/" /> : null}
            <CheckoutSummary 
                ingredients={props.ingredients}
                onCheckoutCancelled={handleCheckoutCancel}
                onCheckoutContinued={handleCheckoutContinue}
            />
            <Route 
                path={`${props.match.path}/contact-data`}
                component={ContactData}
            />
        </div>
        : <Redirect to="/" />;
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.orders.purchased,
    };
};

export default connect(mapStateToProps)(Checkout);