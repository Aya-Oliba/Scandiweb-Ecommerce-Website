import './productcard.scss'
import React, { Component } from 'react';

class Productcard extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className='card'>
                <div className="img-wrapper">
                    {console.log(this.props.product?.prices[0].currency.symbol)}
                    <img src={this.props.product?.gallery[0]} alt="Product" />
                </div>
                <div className="description">
                    <p className='product-title'>{this.props.product?.name}</p>
                    <span className='product-price'>{this.props.product?.prices[0].currency.symbol}</span>
                    <span>{this.props.product?.prices[0].amount}</span>
                </div>
            </div>
        );
    }
}

export default Productcard;