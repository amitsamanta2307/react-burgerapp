import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

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

    handleCheckoutCancel = () => {
        this.props.history.goBack();
    };

    handleCheckoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ingredients) {
            summary = (
                <div>
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
        ingredients: state.ingredients,
    };
};

export default connect(mapStateToProps)(Checkout);