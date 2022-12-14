import React, { Component } from 'react'
import './Bag.scss'
import BagContent from '../../components/bag-content/BagContent'
import { connect } from 'react-redux';
import { addToCart } from '../../redux/CartSlice';

const mapStateToProps = (state) => {
    return {
        currency: state.currencyStore.currency,
        cart: state.cartStore
    }
};

const mapDispatchToProps = { addToCart };

export class Bag extends Component {
    render() {
        return (
            <div className='bag'>
                <BagContent miniView={false}/>
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Bag);