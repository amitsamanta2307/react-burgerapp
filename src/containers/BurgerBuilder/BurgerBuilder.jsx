import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {
    addIngredient,
    removeIngredient,
    initIngredients,
    purchaseInit,
    setAuthRedirectPath
} from '../../store/actions';

const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, []);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0 );

        return sum > 0;
    };

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath("/checkout");
            props.history.push('/auth');
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    };

    
    const disabledInfo = {
        ...props.ingredients
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if (props.ingredients) {
        burger = (
            <React.Fragment>
                <Burger ingredients={props.ingredients} />
                <BuildControls
                    onIngredientAdded={props.onIngredientAdded}
                    onIngredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={props.totalPrice}
                    purchasable={updatePurchaseState(props.ingredients)}
                    isAuthenticated={props.isAuthenticated}
                    onOrdered={purchaseHandler}
                />
            </React.Fragment>
        );

        orderSummary = <OrderSummary
            price={props.totalPrice}
            ingredients={props.ingredients}
            onPurchaseCancelled={purchaseCancelHandler}
            onPurchaseContinued={purchaseContinueHandler}
        />;
    }

    return (
        <React.Fragment>
            <Modal 
                show={purchasing}
                onModalClosed={purchaseCancelHandler}
            >
                {orderSummary}
            </Modal>
            {burger}
        </React.Fragment>
    );
    
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
        onInitIngredients: () => dispatch(initIngredients()),
        onInitPurchase: () => dispatch(purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));