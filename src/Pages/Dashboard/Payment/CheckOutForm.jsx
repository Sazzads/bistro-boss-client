import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import './Payment'
import { useEffect } from 'react';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const CheckOutForm = ({ price, cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure()
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('')
    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [price, axiosSecure])
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log("error", error);
            setCardError(error.message)
        }
        else {
            // console.log('payment method', paymentMethod);
            setCardError('')
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe
            .confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymus',
                        email: user?.email || 'unknown',
                    },
                },
            })
        if (confirmError) {
            console.log(confirmError);
        };
        console.log('payment Intent', paymentIntent);

        setProcessing(false);

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id)
            //save payment information to server
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                quantity: cart.length,
                cartItems: cart.map(item => item._id),
                menu_Items: cart.map(item => item.menuItemId),
                orderStatus: 'service pending',
                itemNames: cart.map(item => item.name)
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data.result.insertedId) {
                        // display confirm 
                    }
                })
        }

    }
    return (
        <>
            <form className='w-2/3 m-8 ' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />

                <button className='btn btn-primary mt-4 btn-sm' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className='text-red-600 ml-8'>{cardError}</p>
            }
            {
                transactionId && <p className='text-green-500 ml-8'>transaction complete with transactionId: {transactionId}</p>
            }

        </>

    );
};

export default CheckOutForm;