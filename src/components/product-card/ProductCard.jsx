import './ProductCard.scss'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import shoppingCart from '../../shoppingCart.png';
import { Link } from 'react-router-dom';

// passing store currency global value into component props 
const mapStateToProps = (state) => {
    return {
        currency: state.currencyStore.currency
    }
};

class ProductCard extends Component {
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
            <div className={this.props.product.inStock ? 'card' :'card unavailable'}>
                {
                    !this.props.product.inStock ?
                        <div className="card-overlay" >
                            <p>OUT OF STOCK</p>
                        </div>
                    : null    
                }
                <Link to={`/products/${this.props.product.id}`}>
                    <div className="img-wrapper">
                        <img src={this.props.product?.gallery[0]} alt="Product" />
                        <div className="add-to-cart">
                            <img src={shoppingCart} alt="shopping Bag" />
                        </div>
                    </div>
                </Link>
                <div className="description">
                    <p className='product-title' style={this.props.product.inStock ? null : {color:"#8D8F9A"}}>{this.props.product?.name}</p>
                    <span className='product-price' style={this.props.product.inStock ? null : {color:"#8D8F9A", fontWeight:"bold"}}>{this.state.priceDetails.currency.symbol}</span>
                    <span style={this.props.product.inStock ? null : {color:"#8D8F9A", fontWeight:"bold"}}>{this.state.priceDetails.amount}</span>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(ProductCard);
