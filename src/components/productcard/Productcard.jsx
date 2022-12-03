import './productcard.scss'
import React, { Component } from 'react';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
    console.log("from mapStateToProps", state)
    return {
        currency: state.currencyStore.currency
    }
};
class Productcard extends Component {
    constructor(props){
        super(props)
        this.state = {
            priceDetails: {
                amount: 0,
                currency: {
                    symbol: '$'
                }
            },
        }
    }

    static getDerivedStateFromProps(props, state) {
        let defaultPriceDetails = {
            amount: 0,
            currency: {
                symbol: '$'
            }
        };
        if(props.product?.prices !== null){
            props.product.prices.forEach((priceDetails) => {
                if(priceDetails?.currency?.symbol === props.currency){
                    defaultPriceDetails = priceDetails
                }
            })
        }
        return {
            priceDetails: defaultPriceDetails
        }
    }
    
    render() {
        return (
            <div className='card'>
                <div className="img-wrapper">
                    <img src={this.props.product?.gallery[0]} alt="Product" />
                </div>
                <div className="description">
                    <p className='product-title'>{this.props.product?.name}</p>
                    <span className='product-price'>{this.state.priceDetails.currency.symbol}</span>
                    <span>{this.state.priceDetails.amount}</span>
                    {console.log(this.state)}
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(Productcard);
