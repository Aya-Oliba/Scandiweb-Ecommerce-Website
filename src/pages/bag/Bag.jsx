import React, { Component } from 'react'
import { Bagcontent } from '../../components/bagcontent/Bagcontent'
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        currency: state.currencyStore.currency,
        cart: state.cartStore
    }
};

export class Bag extends Component {
    render() {
        return (
        <div>
            {/* cart */}
            <Bagcontent/>
        </div>
        )
    }
}
export default connect(mapStateToProps)(Bag);