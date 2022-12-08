import React, { Component } from 'react'
import Bagproduct from "../bagproduct/Bagproduct"
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
    const x = {
        currency: state.currencyStore.currency,
        cartProducts: state.cartStore.cartProductsMap
    }
    console.log("herererere", x);
    return x;
};

export class Bagcontent extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
        <div className='Bagcontent'>
            <h3>CART</h3>
            { console.log("hamada", this.props.cartProducts) }
            {
                this.props.cartProducts ? 
                Object.keys(this.props.cartProducts).map((key,i) => {
                    return(
                        <Bagproduct key={i} product={this.props.cartProducts[key]}/>
                    )
                }) : <p>Error in rendering</p>
            }
        </div>
        )
    }
}
export default connect(mapStateToProps)(Bagcontent);