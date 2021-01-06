import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import { fetchOrders } from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = ({ 
    orders,
    loading,
    token,
    userId,
    onFetchOrders
}) => {

    useEffect(() => {
        onFetchOrders(token, userId);
    }, []);

    const renderOrders = () => {
        return orders.map(order => (
            <Order key={order.id}
                ingredients={order.ingredients}
                price={order.price}
            />
        ));
    };

    return (
        <div>
            {loading 
                ? <Spinner />
                : renderOrders()
            }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));