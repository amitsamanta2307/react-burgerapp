import React from 'react';

import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import styles from './ContactData.module.css';

class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false,
    }

    handleOrderSubmit = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Amit Samanta',
                address: {
                    street: 'Test Street',
                    zipCode: '111111',
                    country: 'India'
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    };

    render() {
        let form = (<form>
            <Input inputtype="input" type="text" name="name" placeholder="Your Name" />
            <Input inputtype="input" type="email" name="email" placeholder="Your Email" />
            <Input inputtype="input" type="text" name="street" placeholder="Street" />
            <Input inputtype="input" type="text" name="postal" placeholder="Postal Code" />
            <Button btnType="Success" clicked={this.handleOrderSubmit}>ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;