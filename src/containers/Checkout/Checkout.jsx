import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { purchaseInit } from '../../store/actions';

class Checkout extends React.Component {
    // state = {
    //     ingredients: null,
    //     totalPrice: 0,
    // }

    // componentWillMount() {
    //     const searchParams = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;

    //     for (let pair of searchParams.entries()) {
    //         if (pair[0] === 'price') {
    //             price = pair[1];
    //         } else {
    //             ingredients[pair[0]] = +pair[1];
    //         }
    //     }
    //     this.setState({ ingredients: ingredients, totalPrice: price });
    // }

    componentWillMount() {
        this.props.onInitPurchase();
    }

    handleCheckoutCancel = () => {
        this.props.history.goBack();
    };

    handleCheckoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased 
                ? <Redirect to="/" />
                : null;

            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ingredients}
                        onCheckoutCancelled={this.handleCheckoutCancel}
                        onCheckoutContinued={this.handleCheckoutContinue}
                    />
                    <Route 
                        path={`${this.props.match.path}/contact-data`}
                        component={ContactData}
                    />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.orders.purchased,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(purchaseInit())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);